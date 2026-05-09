"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

export function ScrollDepthTracker() {
  useEffect(() => {
    const marks = [25, 50, 75, 100];
    const sent = new Set();
    let ticking = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const depth = max > 0 ? Math.round((window.scrollY / max) * 100) : 100;
      marks.forEach((mark) => {
        if (depth >= mark && !sent.has(mark)) {
          sent.add(mark);
          track("scroll_depth", { depth: mark });
        }
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
