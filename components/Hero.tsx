"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { MapPin, ArrowRight, Clock, Calendar, IceCream } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Mairie+de+La+Frette-sur-Seine+95530";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yRaw     = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y        = useSpring(yRaw, { stiffness: 80, damping: 20 });
  const opacity  = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale    = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden pt-4 pb-16 sm:pt-10"
      aria-label="Accueil"
    >
      {/* ── Background accents ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-sun-100 opacity-60 blur-[80px]" />
        <div className="absolute -bottom-20 -right-20 h-[450px] w-[450px] rounded-full bg-teal-100 opacity-50 blur-[80px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-12">

        {/* ══════════════════════════════════
            LEFT — copy + schedule + CTAs
            ══════════════════════════════════ */}
        <motion.div style={{ opacity }} className="relative z-10 order-2 md:order-1">

          {/* Season badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full bg-cream/80 px-3.5 py-1.5 text-[12px] font-semibold text-teal-700 shadow-soft backdrop-blur"
          >
            <IceCream className="h-3.5 w-3.5 animate-breathe" />
            Saison ouverte · mai → septembre
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="h-display mt-4 text-[38px] leading-[1.06] sm:text-5xl lg:text-[62px]"
          >
            La gourmandise{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="font-script text-cherry drop-shadow-[0_2px_8px_rgba(226,107,92,0.28)]">
                débarque
              </span>
              <Underline />
            </span>{" "}
            sur les{" "}
            <em className="font-display not-italic" style={{ WebkitTextStroke: "1.5px #221C12", color: "transparent" }}>
              quais&nbsp;de&nbsp;Seine
            </em>
            <span className="text-ink">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-md text-[16px] leading-relaxed text-ink/65 sm:text-[17px]"
          >
            Glaces artisanales, crêpes minute et gaufres dorées à deux pas de
            l'eau. Une caravane vert tendre. Et le quai de La Frette pour
            décor
          </motion.p>

          {/* ── SCHEDULE CARD — prominent ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
            className="glass mt-6 rounded-3xl p-5 shadow-schedule"
          >
            {/* Live indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-500" />
              </span>
              <span className="text-[11.5px] font-bold uppercase tracking-[0.22em] text-teal-700">
                Ouvert ce week-end
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="col-span-1 flex flex-col items-start gap-1">
                <Calendar className="h-4 w-4 text-ink/40" />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-ink/45">
                  Jours
                </span>
                <span className="font-display text-[15px] font-medium text-ink">
                  Sam · Dim
                  <br />
                  Fériés
                </span>
              </div>
              <div className="col-span-1 flex flex-col items-start gap-1">
                <Clock className="h-4 w-4 text-ink/40" />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-ink/45">
                  Heures
                </span>
                <span className="font-display text-[22px] font-medium leading-none text-cherry">
                  14h–19h
                </span>
              </div>
              <div className="col-span-1 flex flex-col items-start gap-1">
                <IceCream className="h-4 w-4 text-ink/40" />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-ink/45">
                  Saison
                </span>
                <span className="font-display text-[15px] font-medium text-ink">
                  Mai
                  <br />→ Sept.
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 border-t border-ink/6 pt-3 text-[12.5px] text-ink/55">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-cherry" />
              Face à la mairie de La Frette-sur-Seine, 95530
            </div>
          </motion.div>

          {/* ── CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52 }}
            className="mt-5 flex flex-wrap gap-3"
          >
            {/* Location CTA — pulsing red dot + eye-catching */}
            <Link
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-liquid group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-cherry px-6 py-3.5 text-sm font-semibold text-cream shadow-glow-cherry transition"
              onMouseMove={(e) => {
                const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                (e.currentTarget as HTMLElement).style.setProperty("--x", `${e.clientX - r.left}px`);
                (e.currentTarget as HTMLElement).style.setProperty("--y", `${e.clientY - r.top}px`);
              }}
            >
              {/* Shimmer sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform" />
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cream/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cream" />
              </span>
              <MapPin className="h-4 w-4" />
              Voir l'emplacement
            </Link>

            <Link
              href="/#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-cream/80 px-6 py-3.5 text-sm font-semibold text-ink shadow-soft backdrop-blur transition hover:bg-cream hover:shadow-ring"
            >
              Découvrir la carte
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════
            RIGHT — bannerup.png illustration
            ══════════════════════════════════ */}
        <div className="relative order-1 md:order-2">
          {/* Main illustration */}
          <motion.div
            style={{ y, scale }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="drop-shadow-[0_30px_60px_rgba(34,28,18,0.18)]"
            >
              <Image
                src="/bannerup.png"
                alt="La caravane Glaces en Seine sur les quais de Seine — illustration"
                width={900}
                height={440}
                priority
                className="w-full rounded-3xl"
              />
            </motion.div>

            {/* Floating product badges */}
            <FloatingBadge
              delay={0.6}
              className="absolute -left-4 top-[15%] sm:-left-8"
              color="bg-rose-100"
            >
              <IceCream className="h-4 w-4 text-cherry" />
              <span className="text-[13px] font-semibold text-ink">Glaces artisanales</span>
            </FloatingBadge>

            <FloatingBadge
              delay={0.8}
              className="absolute -right-4 top-[40%] sm:-right-6"
              color="bg-sun-100"
            >
              <Clock className="h-4 w-4 text-ink/60" />
              <span className="text-[13px] font-semibold text-ink">14h – 19h</span>
            </FloatingBadge>

            <FloatingBadge
              delay={1.0}
              className="absolute -bottom-4 left-[20%]"
              color="bg-teal-100"
            >
              <MapPin className="h-4 w-4 text-teal-700" />
              <span className="text-[13px] font-semibold text-teal-700">La Frette-sur-Seine</span>
            </FloatingBadge>

            {/* Sparkle stars */}
            <Sparkle className="absolute right-[10%] -top-4 h-6 w-6 text-sun-500" delay={0} />
            <Sparkle className="absolute left-[8%] bottom-[8%] h-4 w-4 text-cherry" delay={0.4} />
          </motion.div>
        </div>
      </div>

      <ScrollHint />
    </section>
  );
}

/* ── Sub-components ──────────────────────────────────── */

function FloatingBadge({
  children,
  className = "",
  color = "bg-cream",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={`${className} glass shimmer-card inline-flex items-center gap-2 rounded-full px-3.5 py-2 shadow-soft ${color}`}
    >
      {children}
    </motion.div>
  );
}

function Underline() {
  return (
    <svg
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 h-[10px] w-full"
      aria-hidden
    >
      <motion.path
        d="M2,9 C 55,2 145,13 218,5"
        fill="none"
        stroke="#F4C95D"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.3, delay: 0.5, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Sparkle({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: [0, 15, -10, 0] }}
      transition={{ duration: 0.6, delay, repeat: Infinity, repeatDelay: 3 }}
      aria-hidden
    >
      <path d="M12 2 L13.5 9 L21 11 L13.5 13 L12 21 L10.5 13 L3 11 L10.5 9 Z" fill="currentColor" />
    </motion.svg>
  );
}

function ScrollHint() {
  return (
    <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] text-ink/40">
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-1"
      >
        <span>Faites défiler</span>
        <span className="h-5 w-px bg-ink/25" />
      </motion.div>
    </div>
  );
}
