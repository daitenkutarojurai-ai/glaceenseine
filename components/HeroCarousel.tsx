"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Mairie+de+La+Frette-sur-Seine+95530";

const slides = [
  {
    src: "/camion-patronne.jpg",
    alt: "La caravane Glaces en Seine et ses fondatrices sur le quai de la Seine",
    position: "object-[center_30%]",
    eyebrow: "Depuis 2024 · La Frette-sur-Seine",
    title: "La gourmandise",
    titleScript: "débarque",
    titleEnd: "sur les quais.",
    sub: "Glaces artisanales, crêpes minute et gaufres dorées à deux pas de l'eau.",
  },
  {
    src: "/affiche.jpg",
    alt: "Affiche Glaces en Seine — La gourmandise débarque sur les quais de Seine",
    position: "object-top",
    eyebrow: "Saison ouverte · mai → septembre",
    title: "Trois douceurs,",
    titleScript: "une caravane",
    titleEnd: "au bord de l'eau.",
    sub: "Glaces, crêpes, gaufres — préparées chaque matin avec des ingrédients du marché.",
  },
  {
    src: "/inprod.jpg",
    alt: "Préparation des crêpes au billig",
    position: "object-center",
    eyebrow: "Fait maison · chaque matin",
    title: "Tout est préparé",
    titleScript: "ici",
    titleEnd: "devant vous.",
    sub: "Pâte à crêpe du matin, glaces turbinées sur place, gaufres sortant du fer.",
  },
];

const AUTO_DELAY = 5500;

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

  const slide = slides[current];

  return (
    <section
      className="relative min-h-[92dvh] overflow-hidden"
      aria-label="Glaces en Seine — présentation"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slides ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${slide.position}`}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/25 to-ink/70" />
          {/* Warm tint layer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cherry/10 via-transparent to-sun-500/5" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ── */}
      <div className="relative z-10 flex h-full min-h-[92dvh] flex-col justify-between px-4 py-8 sm:px-10">

        {/* Top bar: slide counter */}
        <div className="flex items-center justify-end">
          <span className="rounded-full bg-cream/15 px-3 py-1 text-[12px] font-semibold text-cream/80 backdrop-blur">
            {current + 1} / {slides.length}
          </span>
        </div>

        {/* Center copy */}
        <div className="flex flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="max-w-3xl"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-cream/70 sm:text-[12px]">
                {slide.eyebrow}
              </p>
              <h1 className="h-display mt-3 text-[40px] leading-[1.04] text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-7xl">
                {slide.title}{" "}
                <span className="font-script text-sun-300">{slide.titleScript}</span>
                <br />
                <span className="text-cream/90">{slide.titleEnd}</span>
              </h1>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-cream/75 sm:text-[17px]">
                {slide.sub}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-liquid group inline-flex items-center gap-2.5 rounded-full bg-cherry px-6 py-3.5 text-sm font-semibold text-cream shadow-glow-cherry transition"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
              }}
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cream/70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cream" />
              </span>
              <MapPin className="h-4 w-4" />
              Voir l'emplacement
            </Link>
            <Link
              href="/#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-cream/15 px-6 py-3.5 text-sm font-semibold text-cream backdrop-blur transition hover:bg-cream/25"
            >
              Voir la carte
            </Link>
          </motion.div>
        </div>

        {/* Bottom: schedule + navigation */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          {/* Schedule pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl px-5 py-3.5 shadow-schedule"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">
                Ouvert ce week-end
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
              <Calendar className="h-3.5 w-3.5 text-ink/50" />
              Sam · Dim · Fériés
            </div>
            <div className="flex items-center gap-1.5 text-[13px] font-medium text-cherry">
              <Clock className="h-3.5 w-3.5" />
              14h – 19h
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-ink/55">
              <MapPin className="h-3 w-3 shrink-0 text-cherry" />
              La Frette-sur-Seine · 95530
            </div>
          </motion.div>

          {/* Prev / Next + dots */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Slide précédente"
              className="grid h-10 w-10 place-items-center rounded-full bg-cream/20 text-cream backdrop-blur transition hover:bg-cream/35 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-1.5" role="tablist" aria-label="Slides">
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className="cursor-pointer transition-all duration-300"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === current
                        ? "h-2.5 w-8 bg-cream"
                        : "h-2.5 w-2.5 bg-cream/40 hover:bg-cream/70"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Slide suivante"
              className="grid h-10 w-10 place-items-center rounded-full bg-cream/20 text-cream backdrop-blur transition hover:bg-cream/35 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {!paused && (
        <motion.div
          key={`${current}-bar`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTO_DELAY / 1000, ease: "linear" }}
          style={{ transformOrigin: "left" }}
          className="absolute bottom-0 left-0 z-20 h-0.5 w-full bg-cherry/70"
        />
      )}
    </section>
  );
}
