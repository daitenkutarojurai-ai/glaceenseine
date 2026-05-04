"use client";

import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";

/* ─── ScrollChrome ──────────────────────────────────────────
   Top-of-viewport progress bar (GPU `scaleX`) + a back-to-top
   button that fades in past 600px. Both are transform-only and
   piggy-back on a single rAF loop via framer's `useScroll`, so
   they don't add scroll listeners of their own. */
export function ScrollChrome() {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    mass: 0.4,
  });
  const [showTop, setShowTop] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    setShowTop(v > 600);
  });

  const toTop = useCallback(() => {
    if (typeof window === "undefined") return;
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, []);

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progress }}
        aria-hidden
      />
      <button
        type="button"
        onClick={toTop}
        aria-label="Revenir en haut"
        data-visible={showTop ? "true" : "false"}
        className="back-to-top grid h-11 w-11 place-items-center rounded-full bg-ink/85 text-cream shadow-glow backdrop-blur"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </>
  );
}
