"use client";

import { useEffect } from "react";

export function ImageParallax() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;

    const clear = () => {
      document.querySelectorAll("[data-parallax-media] img").forEach((image) => {
        image.style.transform = "";
      });
    };

    const update = () => {
      const enabled = window.innerWidth > 760 && !reduceMotion.matches;
      if (!enabled) {
        clear();
        ticking = false;
        return;
      }

      document.querySelectorAll("[data-parallax-media] img").forEach((image) => {
        const rect = image.parentElement.getBoundingClientRect();
        const viewportProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = Math.max(-10, Math.min(10, (viewportProgress - 0.5) * 18));
        image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.045)`;
      });

      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduceMotion.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener("change", requestUpdate);
      clear();
    };
  }, []);

  return null;
}
