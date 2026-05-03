"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, IceCream, Cookie, CakeSlice, X, ZoomIn } from "lucide-react";
import { WeeklyPollCard } from "./WeeklyPoll";

const PILLS = [
  { icon: IceCream, label: "Glaces artisanales", color: "bg-rose-100 text-cherry" },
  { icon: Cookie,   label: "Crêpes",               color: "bg-sun-100 text-ink" },
  { icon: CakeSlice,label: "Gaufres",               color: "bg-teal-100 text-teal-700" },
];

const MENU_SRC = "/menu2.jpg";

export function MenuBanner() {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoomed(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomed]);

  return (
    <section
      id="menu"
      className="scroll-mt-20 py-16 sm:py-24"
      aria-label="Notre carte"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-4 sm:mb-5">
          <div>
            <p className="eyebrow">La carte</p>
            <h2 className="h-display mt-1 text-2xl sm:text-3xl">
              Trois douceurs,{" "}
              <span className="font-script text-cherry">une caravane</span>.
            </h2>
          </div>
          <Link
            href="/menu"
            className="group hidden shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream shadow-soft transition hover:shadow-glow-cherry sm:inline-flex"
          >
            Voir tout
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="group block w-full cursor-zoom-in text-left"
          aria-label="Agrandir la carte Glaces en Seine"
        >
          <div className="relative overflow-hidden rounded-3xl bg-cream shadow-soft transition duration-500 group-hover:shadow-ring">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={MENU_SRC}
                alt="Carte Glaces en Seine — glaces, crêpes et gaufres artisanales sur les quais de Seine"
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                quality={92}
                className="object-contain transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-[11.5px] font-semibold text-cream shadow-soft backdrop-blur transition group-hover:bg-ink">
              <ZoomIn className="h-3.5 w-3.5" />
              Agrandir
            </span>
          </div>
        </button>

        {/* Mobile pills + CTA */}
        <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
          {PILLS.map((p) => (
            <span
              key={p.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold shadow-soft ${p.color}`}
            >
              <p.icon className="h-3.5 w-3.5" />
              {p.label}
            </span>
          ))}
        </div>
        <div className="mt-3 sm:hidden">
          <Link
            href="/menu"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 text-sm font-semibold text-cream shadow-soft"
          >
            Voir la carte complète
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Poll — contextuellement lié au menu */}
        <div className="mt-4">
          <WeeklyPollCard />
        </div>
      </div>

      <AnimatePresence>
        {zoomed && (
          <motion.div
            key="menu-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setZoomed(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Carte Glaces en Seine — vue agrandie"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setZoomed(false)}
                className="absolute right-2 top-2 z-10 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-4 py-2 text-[12.5px] font-semibold text-ink shadow-soft transition hover:bg-cream sm:right-3 sm:top-3"
                aria-label="Fermer la vue agrandie"
              >
                <X className="h-4 w-4" />
                Fermer
              </button>
              <div className="relative h-full w-full">
                <Image
                  src={MENU_SRC}
                  alt="Carte Glaces en Seine — vue agrandie"
                  fill
                  sizes="100vw"
                  quality={95}
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
