"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, Clock, Calendar, ChevronLeft, ChevronRight, Navigation } from "lucide-react";

const MAPS_DIR_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Mairie+de+La+Frette-sur-Seine+95530";

const AUTO_DELAY = 7000;

interface Slide {
  src: string;
  alt: string;
  /** Slides whose image already contains the brand text (e.g. bannerforsection) skip the overlay text. */
  hideText?: boolean;
  headline?: string;
  script?: string;
  sub?: string;
}

const slides: Slide[] = [
  {
    src: "/carousel1-2026.png",
    alt: "Glaces en Seine — la caravane artisanale sur les quais de Seine à La Frette",
    headline: "La gourmandise",
    script: "débarque",
    sub: "Glaces, crêpes & gaufres artisanales sur les quais de Seine.",
  },
  {
    src: "/bannerforsection.png",
    alt: "Glaces en Seine — la marque, la caravane et les quais",
    hideText: true,
  },
  {
    src: "/carousel3-2026.png",
    alt: "Glaces en Seine — venez nous retrouver entre La Frette et Cormeilles",
    hideText: true,
  },
];

/* CTAs shared between text/hideText slides */
function CarouselCtas({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2.5 sm:gap-3 ${className}`}>
      <a
        href={MAPS_DIR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-cream shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink/85 hover:shadow-lg sm:px-6 sm:py-3 sm:text-sm"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
        </span>
        <Navigation className="h-3.5 w-3.5 shrink-0" />
        <span className="hidden xs:inline">Nous trouver</span>
        <span className="xs:hidden">Itinéraire</span>
      </a>
      <Link
        href="/privatisation"
        className="btn-liquid inline-flex items-center gap-2 rounded-full bg-cherry/90 px-5 py-2.5 text-[13px] font-semibold text-cream shadow-glow-cherry backdrop-blur-sm transition sm:px-6 sm:py-3 sm:text-sm"
      >
        <Sparkles className="h-3.5 w-3.5 shrink-0" />
        Privatiser
      </Link>
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 rounded-full bg-sun-300/90 px-5 py-2.5 text-[13px] font-semibold text-ink shadow-soft backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-sun-300 hover:shadow-glow-sun sm:px-6 sm:py-3 sm:text-sm"
      >
        Notre menu
      </Link>
    </div>
  );
}

/* Floating ambient orbs — warm light-leak accents */
function AmbientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -right-16 top-[8%] h-72 w-72 rounded-full bg-sun-300/25 blur-3xl"
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[18%] right-[10%] h-56 w-56 rounded-full bg-teal-300/20 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      />
      <motion.div
        className="absolute left-[2%] top-[35%] h-40 w-40 rounded-full bg-cream/20 blur-2xl"
        animate={{ y: [0, -16, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Scroll-driven parallax — image moves at 60% of scroll speed */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const go = useCallback((idx: number) => setCurrent(idx), []);
  const next = useCallback(() => go((current + 1) % slides.length), [current, go]);
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [current, go]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_DELAY);
    return () => clearInterval(id);
  }, [next, paused]);

  /* Swipe support */
  const [touchX, setTouchX] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => setTouchX(e.touches[0].clientX);
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 44) dx < 0 ? next() : prev();
    setTouchX(null);
  };

  const slide = slides[current];

  return (
    <section
      ref={sectionRef}
      className="relative h-[62dvh] min-h-[440px] w-full overflow-hidden bg-ink sm:h-[78dvh] sm:min-h-[520px]"
      aria-label="Glaces en Seine"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >

      {/* ────────────────────────────────────────────────────────
          Layer 1 · Full-bleed cover image with parallax
          Each slide fills the entire carousel (object-cover).
      ──────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-x-0 top-[-6%] bottom-[-6%]"
        style={{ y: parallaxY, willChange: "transform" }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority
              sizes="100vw"
              quality={92}
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ────────────────────────────────────────────────────────
          Layer 2 · Warm atmospheric overlays (no dark sides)
          — left warmth frames the text zone
          — bottom eases the hero into the page
          — top subtle vignette for sky definition
      ──────────────────────────────────────────────────────── */}

      {/* Left warm reading zone — subtle so the picture stays vivid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(255,251,241,0.30) 0%, rgba(255,251,241,0.08) 35%, transparent 60%)",
        }}
      />
      {/* Bottom edge fade — minimal so the banner doesn't bleed into the next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%]"
        style={{
          background:
            "linear-gradient(to top, rgba(255,251,241,0.55) 0%, transparent 100%)",
        }}
      />
      {/* Top sky vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/10 to-transparent" />

      {/* ────────────────────────────────────────────────────────
          Layer 3 · Film grain (uses .grain utility from globals)
      ──────────────────────────────────────────────────────── */}
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />

      {/* ────────────────────────────────────────────────────────
          Layer 4 · Ambient light-leak orbs
      ──────────────────────────────────────────────────────── */}
      <AmbientOrbs />

      {/* ────────────────────────────────────────────────────────
          Layer 5 · Content
      ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-6 sm:px-10 sm:pb-10 sm:pt-8 lg:px-16">

        {/* ── Top bar: dots + counter ── */}
        <div className="flex items-start justify-between">

          {/* Slide indicators */}
          <div className="flex items-center gap-2 pt-1" role="tablist">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}`}
                onClick={() => go(i)}
                className="cursor-pointer p-1.5"
              >
                <motion.span
                  animate={
                    i === current
                      ? { width: 28, backgroundColor: "rgba(34,28,18,0.80)" }
                      : { width: 7,  backgroundColor: "rgba(34,28,18,0.28)" }
                  }
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="block h-[3px] rounded-full"
                  style={{ width: 7 }}
                />
              </button>
            ))}
          </div>

          {/* Counter */}
          <span className="glass rounded-full px-3 py-1 text-[11px] font-semibold tabular-nums text-ink/70">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Middle: headline + CTAs (text slides) / empty (hideText slides) ── */}
        <div className="flex flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
              exit={{   opacity: 0, y: -18, filter: "blur(3px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl lg:max-w-2xl"
            >
              {!slide.hideText && (
                <>
                  {/* Eyebrow */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.5 }}
                    className="mb-3 text-[10px] font-bold uppercase tracking-[0.26em] text-ink/55 drop-shadow-sm"
                  >
                    La Frette-sur-Seine · Quai de Seine
                  </motion.p>

                  {/* Headline */}
                  <h1 className="h-display text-[36px] leading-[1.04] text-ink drop-shadow-sm xs:text-[44px] sm:text-6xl lg:text-[4.25rem]">
                    {slide.headline}{" "}
                    <span className="font-script text-cherry drop-shadow-sm">
                      {slide.script}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.5 }}
                    className="mt-3 max-w-sm text-[14px] leading-relaxed text-ink/65 drop-shadow-sm sm:text-[15.5px]"
                  >
                    {slide.sub}
                  </motion.p>

                  {/* CTAs (text slides — anchored to headline) */}
                  <CarouselCtas className="mt-6 sm:mt-8" />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTAs (hideText slides — anchored just above the schedule chip) */}
        {slide.hideText && (
          <motion.div
            key={`${current}-cta`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <CarouselCtas />
          </motion.div>
        )}

        {/* ── Bottom row: schedule chip + arrows ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48 }}
            className="glass inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 self-start rounded-2xl px-4 py-2.5 sm:gap-x-4 sm:px-5 sm:py-3"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700">
                Ouvert ce week-end
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-ink/75">
              <Calendar className="h-3.5 w-3.5 text-ink/40" />
              Sam · Dim · Fériés
            </div>
            <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-cherry">
              <Clock className="h-3.5 w-3.5" />
              14h – 19h
            </div>
          </motion.div>

          {/* Nav arrows */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={prev}
              aria-label="Précédent"
              className="glass grid h-10 w-10 cursor-pointer place-items-center rounded-full text-ink/70 transition hover:text-ink active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Suivant"
              className="glass grid h-10 w-10 cursor-pointer place-items-center rounded-full text-ink/70 transition hover:text-ink active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          Layer 6 · Progress bar
      ──────────────────────────────────────────────────────── */}
      {!paused && (
        <motion.div
          key={`${current}-pb`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTO_DELAY / 1000, ease: "linear" }}
          style={{ transformOrigin: "left" }}
          className="absolute bottom-0 left-0 z-20 h-[2px] w-full bg-gradient-to-r from-teal-400/80 via-cherry/80 to-sun-300/80"
        />
      )}
    </section>
  );
}
