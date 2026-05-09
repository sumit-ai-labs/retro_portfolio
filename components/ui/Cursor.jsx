"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const [active, setActive] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 260, damping: 28, mass: 0.45 });
  const y = useSpring(mouseY, { stiffness: 260, damping: 28, mass: 0.45 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) return undefined;

    const move = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    const enter = (event) => {
      if (event.target.closest(".mag-target")) setActive(true);
    };
    const leave = (event) => {
      if (event.target.closest(".mag-target")) setActive(false);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className={`cursor ${active ? "is-active" : ""}`}
        aria-hidden="true"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.span
        className={`cursor-label ${active ? "is-active" : ""}`}
        aria-hidden="true"
        style={{ x, y, translateX: 16, translateY: 16 }}
      >
        read
      </motion.span>
    </>
  );
}
