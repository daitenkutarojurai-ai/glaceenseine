"use client";
import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

// Must stay `motion.div` rather than a `motion(tag)` call: the factory form
// mints a fresh component type per render, so React remounts the subtree and
// framer crashes mixing keyframes off the detached node.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      // Trigger 12% before the element enters the viewport so content
      // is already in motion by the time it's actually visible —
      // dampens the "blank → pop" feel during fast scrolls.
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
