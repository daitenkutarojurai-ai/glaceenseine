"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, ArrowRight, Sun } from "lucide-react";
import { GlaceIllustration, ScoopIllustration, WafflePill } from "./SceneArt";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yScoop = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yGlace = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yWaffle = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] overflow-hidden pb-24 pt-10 sm:pt-16"
      aria-label="Accueil"
    >
      {/* Decorative blob */}
      <div className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-blob bg-gradient-sun opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-80 h-[520px] w-[520px] rounded-blob bg-teal-100 opacity-70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
        {/* Copy */}
        <motion.div style={{ opacity }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-cream/80 px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-soft backdrop-blur"
          >
            <Sun className="h-3.5 w-3.5 animate-breathe" /> Saison ouverte · mai → septembre
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="h-display mt-5 text-[44px] sm:text-6xl lg:text-7xl"
          >
            La gourmandise <br />
            <span className="relative inline-block">
              <span className="font-script text-cherry">débarque</span>
              <Underline />
            </span>{" "}
            sur les <em className="font-display italic">quais de Seine</em>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-md text-[17px] leading-relaxed text-ink/70"
          >
            Glaces artisanales, crêpes minute et gaufres dorées, à deux pas de l'eau.
            Une caravane saisonnière à La Frette-sur-Seine — pour les promeneurs, les enfants,
            les amoureux du dimanche.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/#emplacement"
              className="btn-liquid inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream shadow-ring hover:shadow-glow"
              onMouseMove={(e) => {
                const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                (e.currentTarget as HTMLElement).style.setProperty("--x", `${e.clientX - r.left}px`);
                (e.currentTarget as HTMLElement).style.setProperty("--y", `${e.clientY - r.top}px`);
              }}
            >
              <MapPin className="h-4 w-4" /> Voir l'emplacement
            </Link>
            <Link
              href="/#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-cream/80 px-6 py-3.5 text-sm font-semibold text-ink shadow-soft backdrop-blur hover:bg-cream"
            >
              Découvrir la carte
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-12 flex items-center gap-6"
          >
            <Trio />
            <div className="text-xs leading-snug text-ink/60">
              <div className="font-semibold text-ink">Sam · Dim · fériés</div>
              14h – 19h · face à la mairie
            </div>
          </motion.div>
        </motion.div>

        {/* Illustration */}
        <div className="relative h-[420px] sm:h-[560px]">
          <motion.div style={{ y: yGlace }} className="absolute left-4 top-4 sm:left-10 sm:top-6">
            <GlaceIllustration className="h-[320px] sm:h-[440px] animate-float" />
          </motion.div>
          <motion.div style={{ y: yScoop }} className="absolute right-2 top-32 sm:right-0 sm:top-40">
            <ScoopIllustration className="h-[200px] sm:h-[260px] animate-float-slow" />
          </motion.div>
          <motion.div style={{ y: yWaffle }} className="absolute bottom-10 left-2 sm:left-10">
            <WafflePill />
          </motion.div>
          <Sparkle className="absolute right-12 top-10 h-6 w-6 text-sun-500" />
          <Sparkle className="absolute left-1/2 bottom-24 h-4 w-4 text-cherry" />
        </div>
      </div>

      <ScrollHint />
    </section>
  );
}

function Trio() {
  return (
    <div className="flex -space-x-3">
      {["#FFCAB1", "#9CD8CC", "#FBE08E"].map((c, i) => (
        <span
          key={i}
          className="grid h-9 w-9 place-items-center rounded-full border-2 border-cream shadow-soft"
          style={{ background: c }}
        >
          <span className="block h-2 w-2 rounded-full bg-ink/30" />
        </span>
      ))}
    </div>
  );
}

function Underline() {
  return (
    <svg
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 h-3 w-full text-sun-500"
      aria-hidden
    >
      <motion.path
        d="M2,8 C 60,2 140,12 218,4"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      animate={{ rotate: [0, 20, -10, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <path
        d="M12 2 L13.5 9 L21 11 L13.5 13 L12 21 L10.5 13 L3 11 L10.5 9 Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

function ScrollHint() {
  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-ink/50">
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-1"
      >
        <span>Faites défiler</span>
        <span className="h-6 w-px bg-ink/30" />
      </motion.div>
    </div>
  );
}
