"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Mairie+de+La+Frette-sur-Seine+95530";

// Order requested: glacesenseine3.png → glacesenseine1.png → menunew.png
// Each slide has a fallback to an existing /public file so the page never breaks.
const slides = [
  {
    src: "/glacesenseine3.png",
    fallback: "/bannerup.png",
    alt: "Glaces en Seine — la caravane sur les quais",
    headline: "La gourmandise",
    script: "débarque",
    sub: "Glaces, crêpes & gaufres artisanales sur les quais de Seine.",
  },
  {
    src: "/glacesenseine1.png",
    fallback: "/affiche.jpg",
    alt: "Glaces en Seine — glaces artisanales",
    headline: "Artisanal,",
    script: "local",
    sub: "Préparé chaque matin avec des produits frais du marché.",
  },
  {
    src: "/menunew.png",
    fallback: "/inprod.jpg",
    alt: "La carte Glaces en Seine",
    headline: "Trois douceurs,",
    script: "une carte",
    sub: "Découvrez toutes nos glaces, crêpes et gaufres.",
    cta: { label: "Voir la carte", href: "/menu" },
  },
];

const AUTO_DELAY = 5500;

function SlideImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [active, setActive] = useState(src);
  useEffect(() => { setActive(src); }, [src]);
  return (
    <Image
      src={active}
      alt={alt}
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
      onError={() => { if (active !== fallback) setActive(fallback); }}
    />
  );
}

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_DELAY);
    return () => clearInterval(id);
  }, [next, paused]);

  // Touch swipe support for phones
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
      className="relative h-[78dvh] min-h-[480px] w-full overflow-hidden sm:h-[88dvh]"
      aria-label="Glaces en Seine"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background slide */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <SlideImage src={slide.src} fallback={slide.fallback} alt={slide.alt} />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/20 to-ink/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-4 pb-6 sm:p-10">

        <div className="flex justify-end">
          <span className="rounded-full bg-cream/15 px-3 py-1 text-[11px] font-semibold text-cream/80 backdrop-blur">
            {current + 1} / {slides.length}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h1 className="h-display text-[32px] leading-[1.06] text-cream drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)] sm:text-6xl lg:text-7xl">
                {slide.headline}{" "}
                <span className="font-script text-sun-300">{slide.script}</span>
              </h1>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-cream/80 sm:text-[17px]">
                {slide.sub}
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                <Link
                  href={slide.cta?.href ?? MAPS_URL}
                  target={slide.cta ? undefined : "_blank"}
                  rel={slide.cta ? undefined : "noopener noreferrer"}
                  className="btn-liquid group inline-flex items-center gap-2 rounded-full bg-cherry px-5 py-2.5 text-[13px] font-semibold text-cream shadow-glow-cherry transition sm:px-6 sm:py-3 sm:text-sm"
                >
                  {slide.cta ? (
                    slide.cta.label
                  ) : (
                    <>
                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cream/70" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cream" />
                      </span>
                      <MapPin className="h-4 w-4" />
                      L&apos;emplacement
                    </>
                  )}
                </Link>
                {!slide.cta && (
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-5 py-2.5 text-[13px] font-semibold text-cream backdrop-blur transition hover:bg-cream/25 sm:px-6 sm:py-3 sm:text-sm"
                  >
                    La carte
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 self-start rounded-2xl px-3 py-2 shadow-schedule sm:gap-x-4 sm:gap-y-2 sm:px-4 sm:py-3"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700 sm:text-[10.5px]">Ouvert ce week-end</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-ink sm:text-[12.5px]">
              <Calendar className="h-3.5 w-3.5 text-ink/50" />Sam · Dim · Fériés
            </div>
            <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-cherry sm:text-[13px]">
              <Clock className="h-3.5 w-3.5" />14h – 19h
            </div>
          </motion.div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <button onClick={prev} aria-label="Précédent"
              className="grid h-9 w-9 place-items-center rounded-full bg-cream/20 text-cream backdrop-blur transition hover:bg-cream/35 cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5" role="tablist">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} role="tab"
                  aria-selected={i === current} aria-label={`Slide ${i + 1}`}
                  className="cursor-pointer">
                  <span className={`block rounded-full transition-all duration-300 ${
                    i === current ? "h-2 w-7 bg-cream" : "h-2 w-2 bg-cream/40 hover:bg-cream/70"
                  }`} />
                </button>
              ))}
            </div>
            <button onClick={next} aria-label="Suivant"
              className="grid h-9 w-9 place-items-center rounded-full bg-cream/20 text-cream backdrop-blur transition hover:bg-cream/35 cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {!paused && (
        <motion.div
          key={`${current}-pb`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTO_DELAY / 1000, ease: "linear" }}
          style={{ transformOrigin: "left" }}
          className="absolute bottom-0 left-0 z-20 h-0.5 w-full bg-cherry/60"
        />
      )}
    </section>
  );
}
