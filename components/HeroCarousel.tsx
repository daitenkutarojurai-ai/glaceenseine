"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Clock, Calendar, ChevronLeft, ChevronRight, Navigation } from "lucide-react";

const MAPS_DIR_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Mairie+de+La+Frette-sur-Seine+95530";

const slides = [
  {
    src: "/imagecarrousel.png",
    fallback: "/bannerup.png",
    alt: "Glaces en Seine — la caravane sur les quais",
    headline: "La gourmandise",
    script: "débarque",
    sub: "Glaces, crêpes & gaufres artisanales sur les quais de Seine.",
    accent: "from-teal-700/60",
  },
  {
    src: "/glaceensein1.png",
    fallback: "/affiche.jpg",
    alt: "Glaces en Seine — glaces artisanales",
    headline: "Artisanal,",
    script: "local",
    sub: "Préparé chaque matin avec des produits frais du marché.",
    accent: "from-cherry/50",
  },
  {
    src: "/menunew.png",
    fallback: "/menu2.jpg",
    alt: "Le menu Glaces en Seine",
    headline: "Trois douceurs,",
    script: "un menu",
    sub: "Glaces, crêpes & gaufres — tout est préparé devant vous.",
    accent: "from-ink/60",
  },
];

const AUTO_DELAY = 6000;

/* Ken Burns zoom effect per slide — different scale directions for variety */
const KB_VARIANTS = [
  { initial: { scale: 1, x: 0,    y: 0    }, animate: { scale: 1.08, x: -12, y: -8  } },
  { initial: { scale: 1, x: 0,    y: 0    }, animate: { scale: 1.06, x: 10,  y: -6  } },
  { initial: { scale: 1.06, x: -8, y: -4  }, animate: { scale: 1,    x: 0,   y: 0   } },
];

function SlideImage({ src, fallback, alt, index }: { src: string; fallback: string; alt: string; index: number }) {
  const [active, setActive] = useState(src);
  useEffect(() => { setActive(src); }, [src]);
  const kb = KB_VARIANTS[index % KB_VARIANTS.length];
  return (
    <motion.div
      className="absolute inset-0"
      initial={kb.initial}
      animate={kb.animate}
      transition={{ duration: AUTO_DELAY / 1000 + 1.5, ease: "easeInOut" }}
    >
      <Image
        src={active}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        onError={() => { if (active !== fallback) setActive(fallback); }}
      />
    </motion.div>
  );
}

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [direction, setDirection] = useState(1);

  const go = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);
  const next = useCallback(() => go((current + 1) % slides.length, 1), [current, go]);
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length, -1), [current, go]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_DELAY);
    return () => clearInterval(id);
  }, [next, paused]);

  const [touchX, setTouchX] = useState<number | null>(null);
  function onTouchStart(e: React.TouchEvent) { setTouchX(e.touches[0].clientX); }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
    setTouchX(null);
  }

  const slide = slides[current];

  return (
    <section
      className="relative h-[80dvh] min-h-[460px] w-full overflow-hidden sm:h-[90dvh]"
      aria-label="Glaces en Seine"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Background + Ken Burns ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-0 overflow-hidden"
        >
          <SlideImage src={slide.src} fallback={slide.fallback} alt={slide.alt} index={current} />
          {/* Layered gradient: directional accent colour + dark vignette */}
          <div className={`absolute inset-0 bg-gradient-to-b ${slide.accent} via-transparent to-ink/75`} />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ── */}
      <div className="relative z-10 flex h-full flex-col justify-between p-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:p-10 sm:pb-10">

        {/* Top bar */}
        <div className="flex items-start justify-between">
          {/* Slide dots — top left */}
          <div className="flex items-center gap-1.5 pt-1" role="tablist">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}`}
                onClick={() => go(i, i > current ? 1 : -1)}
                className="cursor-pointer p-1"
              >
                <motion.span
                  animate={i === current
                    ? { width: 28, backgroundColor: "rgba(255,251,241,1)" }
                    : { width: 8,  backgroundColor: "rgba(255,251,241,0.35)" }
                  }
                  transition={{ duration: 0.3 }}
                  className="block h-2 rounded-full"
                  style={{ width: 8 }}
                />
              </button>
            ))}
          </div>
          {/* Slide counter chip — top right */}
          <span className="glass-dark rounded-full px-3 py-1 text-[11px] font-semibold text-cream/80 backdrop-blur">
            {current + 1} / {slides.length}
          </span>
        </div>

        {/* Middle — headline + CTAs */}
        <div className="flex flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
              exit={{   opacity: 0, y: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              className="max-w-2xl"
            >
              <h1 className="h-display text-[34px] leading-[1.04] text-cream drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] xs:text-[40px] sm:text-6xl lg:text-7xl">
                {slide.headline}{" "}
                <span className="font-script text-sun-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">{slide.script}</span>
              </h1>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-cream/85 drop-shadow sm:text-[17px]">
                {slide.sub}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
                {/* Itinerary — distinct teal pulse button */}
                <a
                  href={MAPS_DIR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2.5 text-[13px] font-semibold text-cream shadow-glow transition hover:from-teal-400 hover:to-teal-500 sm:px-5 sm:py-3 sm:text-sm"
                >
                  {/* shimmer sweep */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cream opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cream" />
                  </span>
                  <Navigation className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden xs:inline">Obtenir l&apos;itinéraire</span>
                  <span className="xs:hidden">Itinéraire</span>
                </a>

                {/* Privatisation */}
                <Link
                  href="/privatisation"
                  className="btn-liquid inline-flex items-center gap-2 rounded-full bg-cherry/90 px-4 py-2.5 text-[13px] font-semibold text-cream shadow-glow-cherry backdrop-blur transition sm:px-5 sm:py-3 sm:text-sm"
                >
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden xs:inline">Privatiser</span>
                  <span className="xs:hidden">Privatiser</span>
                </Link>

                {/* La carte */}
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-4 py-2.5 text-[13px] font-semibold text-cream backdrop-blur transition hover:bg-cream/28 sm:px-5 sm:py-3 sm:text-sm"
                >
                  Le menu
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          {/* Schedule chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="glass inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 self-start rounded-2xl px-3 py-2 shadow-schedule sm:gap-x-4 sm:px-4 sm:py-3"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700">Ouvert ce week-end</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <Calendar className="h-3.5 w-3.5 text-ink/50" />Sam · Dim · Fériés
            </div>
            <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-cherry">
              <Clock className="h-3.5 w-3.5" />14h – 19h
            </div>
          </motion.div>

          {/* Arrow nav */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Précédent"
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-cream/15 text-cream backdrop-blur transition hover:bg-cream/30 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Suivant"
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-cream/15 text-cream backdrop-blur transition hover:bg-cream/30 active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar — thicker, more colourful */}
      {!paused && (
        <motion.div
          key={`${current}-pb`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTO_DELAY / 1000, ease: "linear" }}
          style={{ transformOrigin: "left" }}
          className="absolute bottom-0 left-0 z-20 h-[3px] w-full bg-gradient-to-r from-teal-400 via-cherry to-sun-300"
        />
      )}
    </section>
  );
}
