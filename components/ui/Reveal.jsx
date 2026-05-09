"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

const reveal = {
  hidden: { opacity: 0, y: 14, filter: "contrast(0.9) blur(1.5px)" },
  visible: { opacity: 1, y: 0, filter: "contrast(1) blur(0px)" }
};

export const Reveal = forwardRef(function Reveal({ as = "div", children, className = "", delay = 0, ...props }, ref) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      ref={ref}
      className={`reveal-up ${className}`.trim()}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.54, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
});
