"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, ArrowRight, Sun } from "lucide-react";
import { GlaceIllustration, ScoopIllustration, WafflePill } from "./SceneArt";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Mairie+de+La+Frette-sur-Seine+95530";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yScoop  = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yGlace  = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yWaffle = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92dvh] overflow-hidden pb-20 pt-6 sm:pt-14"
      aria-label="Accueil"
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-blob bg-gradient-sun opacity-55 blur-3xl sm:h-[420px] sm:w-[420px]" />
      <div className="pointer-events-none absolute -right-32 top-60 h-80 w-80 rounded-blob bg-teal-100 opacity-65 blur-3xl sm:h-[520px] sm:w-[520px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-6 px-5 md:grid md:grid-cols-2 md:items-center md:gap-10">

        {/* Illustration — shows above copy on mobile via flex-col-reverse */}
        <div className="relative h-[280px] w-full xs:h-[340px] sm:h-[460px] md:h-[520px]">
          <motion.div style={{ y: yGlace }} className="absolute left-[5%] top-0 w-[55%] sm:left-8 sm:w-[52%]">
            <GlaceIllustration className="h-full w-full animate-float" />
          </motion.div>
          <motion.div style={{ y: yScoop }} className="absolute right-[2%] top-[25%] w-[38%] sm:right-2 sm:w-[36%]">
            <ScoopIllustration className="h-full w-full animate-float-slow" />
          </motion.div>
          <motion.div style={{ y: yWaffle }} className="absolute bottom-4 left-[4%] w-[40%] sm:left-8 sm:w-[38%]">
            <WafflePill />
          </motion.div>
          <Sparkle className="absolute right-[14%] top-[6%] h-5 w-5 text-sun-500 sm:h-6 sm:w-6" />
          <Sparkle className="absolute left-[48%] bottom-[20%] h-3.5 w-3.5 text-cherry sm:h-4 sm:w-4" />
        </div>

        {/* Copy */}
        <motion.div style={{ opacity }} className="relative z-10 text-center md:text-left">
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
            className="h-display mt-4 text-[36px] leading-[1.08] sm:text-5xl lg:text-[64px]"
          >
            La gourmandise{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="font-script text-cherry">débarque</span>
              <Underline />
            </span>{" "}
            sur les{" "}
            <em className="font-display italic">quais&nbsp;de&nbsp;Seine</em>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-ink/70 md:mx-0 md:text-[17px]"
          >
            Glaces artisanales, crêpes minute et gaufres dorées, à deux pas de l'eau.
            Caravane saisonnière à La Frette-sur-Seine — sam · dim · fériés, 14h – 19h.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <Link
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
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
            className="mt-8 flex items-center justify-center gap-5 md:justify-start"
          >
            <Trio />
            <div className="text-xs leading-snug text-ink/60">
              <div className="font-semibold text-ink">Sam · Dim · jours fériés</div>
              14h – 19h · face à la mairie
            </div>
          </motion.div>
        </motion.div>
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
    <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-ink/45">
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-1"
      >
        <span>Faites défiler</span>
        <span className="h-5 w-px bg-ink/30" />
      </motion.div>
    </div>
  );
}
