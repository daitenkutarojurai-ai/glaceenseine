"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";

/* ─── Mosaic tile definitions ───────────────────────────── */
// Each tile has explicit heights for mobile + a desktop grid class.
// This avoids Next/Image fill needing an implicit-height container.
const tiles = [
  {
    src: "/camion-patronne.jpg",
    alt: "La caravane vert tendre et ses fondatrices, quai de Seine",
    caption: "La caravane, sous les tilleuls",
    // Desktop: left column, 2 rows tall (portrait-ish large)
    desktop: "md:col-span-2 md:row-span-2",
    mobileH: "h-64 sm:h-80",
    position: "object-center object-[center_30%]",
  },
  {
    src: "/affiche.jpg",
    alt: "Affiche Glaces en Seine — La gourmandise débarque sur les quais de Seine",
    caption: "Notre affiche d'été",
    // Desktop: right column, 2 rows — portrait fills beautifully
    desktop: "md:col-span-1 md:row-span-2",
    mobileH: "h-80 sm:h-96",
    position: "object-top",
  },
  {
    src: "/inprod.jpg",
    alt: "Préparation des crêpes à la plaque",
    caption: "Crêpes préparées sur la plaque",
    desktop: "md:col-span-1",
    mobileH: "h-56 sm:h-64",
    position: "object-center",
  },
  {
    src: "/camion.jpg",
    alt: "La caravane vue de face sur les quais",
    caption: "Côté Seine, fin de journée",
    desktop: "md:col-span-2",
    mobileH: "h-52 sm:h-64",
    position: "object-center object-top",
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative scroll-mt-24 py-20 sm:py-32"
      aria-labelledby="experience-title"
    >
      {/* Blob */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute right-[-12%] top-10 h-80 w-80 rounded-blob bg-teal-100 opacity-55 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow">Sur les quais</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                id="experience-title"
                className="h-display mt-2 text-3xl sm:text-5xl"
              >
                Une halte{" "}
                <span className="font-script text-cherry">douce</span>{" "}
                au bord de la Seine.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <p className="text-[16px] leading-relaxed text-ink/65 sm:text-[17px]">
              On installe quelques tables sur l'herbe, les enfants courent
              jusqu'au ponton, les amoureux partagent un cornet à deux. La
              caravane sent bon le sucre chaud et la crème vanille.
            </p>
          </Reveal>
        </div>

        {/* ── Mosaic ──
            Mobile: single column, explicit heights.
            Desktop: 3-column × 2-row auto grid.
            The large left tile (col-span-2, row-span-2) shows the camion.
            The portrait right tile (col-span-1, row-span-2) shows the affiche.
            Row 2 fills with inprod (1 col) + camion (2 cols).
         ── */}
        <div
          className="mt-10 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:auto-rows-[240px]"
        >
          {tiles.map((t, i) => (
            <motion.div
              key={t.src}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              whileHover={{ scale: 1.015 }}
              className={`
                group relative overflow-hidden rounded-2xl bg-cream-deep shadow-soft
                cursor-pointer
                ${t.desktop}
                ${t.mobileH} md:h-auto
              `}
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover ${t.position} transition duration-700 ease-out group-hover:scale-105`}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent transition-opacity duration-500 group-hover:from-ink/70" />
              {/* Caption */}
              <div className="absolute inset-x-4 bottom-3 sm:inset-x-5 sm:bottom-4">
                <span className="text-[12px] font-medium text-cream/90 drop-shadow-sm sm:text-[13px]">
                  {t.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
