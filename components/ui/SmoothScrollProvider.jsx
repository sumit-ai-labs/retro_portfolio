"use client";

import { useEffect } from "react";

/**
 * SmoothScrollProvider
 *
 * Progressive enhancement — wraps the app with Lenis smooth scrolling.
 * Safe guards:
 *  - Client-only (useEffect + typeof window check)
 *  - Respects prefers-reduced-motion → native scroll
 *  - Disabled on mobile (≤ 760 px) → native scroll
 *  - Single RAF loop with proper cancel on unmount
 *  - No hydration mismatch (renders children immediately)
 *  - Native scroll remains fully functional if Lenis fails
 */
export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    // Guard: SSR / non-browser
    if (typeof window === "undefined") return;

    // Guard: respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Guard: disable on mobile (matches CSS breakpoint where side-index goes sticky)
    const isMobile = window.innerWidth <= 760;
    if (isMobile) return;

    // Guard: touch-only devices (no hover = likely mobile/tablet)
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarsePointer) return;

    let lenis;
    let rafId;

    const init = async () => {
      try {
        // Dynamic import keeps Lenis out of the SSR bundle entirely
        const { default: Lenis } = await import("lenis");

        lenis = new Lenis({
          duration: 1.1,          // Subtle — not floaty
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease-out
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.0,
          lerp: 0.1,              // Premium editorial feel
          infinite: false,
          autoRaf: false,         // We manage the RAF ourselves
        });

        // Single RAF loop — no duplicates
        function raf(time) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // Expose instance for dialog scroll-lock (stop/start only — no destroy)
        window.__lenis = lenis;

        // Hash link support — intercept <a href="#section"> clicks
        // and delegate to Lenis for smooth animated scroll
        const handleHashClick = (e) => {
          const anchor = e.target.closest("a[href^='#']");
          if (!anchor) return;
          const id = anchor.getAttribute("href").slice(1);
          const target = document.getElementById(id);
          if (!target) return;
          e.preventDefault();
          lenis.scrollTo(target, {
            offset: 0,
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        };
        document.addEventListener("click", handleHashClick);

        // Store cleanup reference
        lenis._hashClickHandler = handleHashClick;
      } catch (err) {
        // Lenis failed — native scroll continues working automatically
        console.warn("[SmoothScrollProvider] Lenis failed to init:", err);
      }
    };

    init();

    return () => {
      // Cancel RAF loop
      if (rafId) cancelAnimationFrame(rafId);
      // Remove hash click handler
      if (lenis?._hashClickHandler) {
        document.removeEventListener("click", lenis._hashClickHandler);
      }
      // Clear global ref before destroying
      if (window.__lenis === lenis) window.__lenis = null;
      // Destroy Lenis instance
      if (lenis) lenis.destroy();
    };
  }, []);

  // Render children immediately — no layout shift, no wrapper div needed
  return children;
}
