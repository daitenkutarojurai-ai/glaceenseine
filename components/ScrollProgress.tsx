"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin progress ribbon at the very top of the viewport.
 * Spring-smoothed so it glides instead of jittering with raw scroll.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2.5px] bg-gradient-to-r from-teal-400 via-cherry to-sun-300"
    />
  );
}
