"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IceCream, Cookie, CakeSlice, X, ZoomIn } from "lucide-react";
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  return (
    <section
      id="menu"
      className="scroll-mt-20 py-8 sm:py-12"
      aria-label="Notre carte"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-4 sm:mb-5">
          <p className="eyebrow">La carte</p>
          <h2 className="h-display mt-1 text-2xl sm:text-3xl">
            Trois douceurs,{" "}
            <span className="font-script text-cherry">une caravane</span>.
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="group block w-full cursor-zoom-in text-left"
          aria-label="Agrandir la carte Glaces en Seine"
        >
          <div className="relative overflow-hidden rounded-3xl bg-cream shadow-soft transition group-hover:shadow-ring">
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
            <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-[11.5px] font-semibold text-cream shadow-soft backdrop-blur">
              <ZoomIn className="h-3.5 w-3.5" />
              Agrandir
            </span>
          </div>
        </button>

        {/* Mobile pills */}
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

        {/* Poll — contextuellement lié au menu */}
        <div className="mt-4">
          <WeeklyPollCard />
        </div>
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Carte Glaces en Seine — vue agrandie"
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-4 py-2 text-[12.5px] font-semibold text-ink shadow-soft transition hover:bg-cream sm:right-5 sm:top-5"
            aria-label="Fermer la vue agrandie"
          >
            <X className="h-4 w-4" />
            Fermer
          </button>
          <div
            className="relative h-full w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
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
        </div>
      )}
    </section>
  );
}
