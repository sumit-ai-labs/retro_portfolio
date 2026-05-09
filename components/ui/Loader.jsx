"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.classList.add("is-loading");
    let current = 0;
    const timer = window.setInterval(() => {
      current = Math.min(100, current + 17);
      setProgress(current);
      if (current >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setVisible(false);
          document.body.classList.remove("is-loading");
        }, 260);
      }
    }, 90);

    return () => {
      window.clearInterval(timer);
      document.body.classList.remove("is-loading");
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="loader"
          role="status"
          aria-label="Loading portfolio"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="loader-press">
            <span className="loader-edition">Issue 01 / Portfolio Edition</span>
            <div className="loader-title">Sumit Dubey</div>
            <div className="loader-bar">
              <div className="loader-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="loader-sub">Warming Press...</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
