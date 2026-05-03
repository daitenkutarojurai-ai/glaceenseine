"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";

const tiles = [
  {
    src: "/camion-patronne.jpg",
    alt: "La caravane Glaces en Seine et ses fondatrices, sous les arbres du quai",
    // Large hero tile: 3 cols, 2 rows
    desktop: "md:col-span-3 md:row-span-2",
    mobileAspect: "aspect-[4/3]",
    position: "object-center",
    caption: "La caravane, sous les tilleuls",
  },
  {
    src: "/inprod.jpg",
    alt: "Préparation des crêpes au billig",
    desktop: "md:col-span-2",
    mobileAspect: "aspect-[4/3]",
    position: "object-center",
    caption: "Le billig en plein service",
  },
  {
    src: "/affiche.jpg",
    alt: "Affiche Glaces en Seine — La gourmandise débarque sur les quais de Seine",
    desktop: "md:col-span-2",
    mobileAspect: "aspect-[3/4]",   // portrait — let it breathe
    position: "object-top",          // show the logo at top of poster
    caption: "Notre affiche d'été",
  },
  {
    src: "/camion.jpg",
    alt: "La caravane vue de face sur le quai de Seine",
    desktop: "md:col-span-5",
    mobileAspect: "aspect-[16/9]",
    position: "object-center object-top",
    caption: "Côté Seine, fin de journée",
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative scroll-mt-24 py-20 sm:py-32"
      aria-labelledby="experience-title"
    >
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute right-[-15%] top-10 h-[360px] w-[360px] rounded-blob bg-teal-100 opacity-60 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow">Sur les quais</p>
            </Reveal>
            <Reveal delay={0.05}>
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
          <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
            <p className="text-[16px] leading-relaxed text-ink/70 sm:text-[17px]">
              On installe quelques tables sur l'herbe, les enfants courent jusqu'au
              ponton, les amoureux partagent un cornet à deux. La caravane sent bon
              le sucre chaud et la crème vanille.
            </p>
          </Reveal>
        </div>

        {/* Mosaic — single column on mobile, 5-col grid on md+ */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-5 md:auto-rows-[200px]">
          {tiles.map((t, i) => (
            <Reveal
              key={t.src}
              delay={i * 0.06}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-cream-deep shadow-soft ${t.desktop} ${t.mobileAspect} md:aspect-auto`}
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className={`object-cover ${t.position} transition duration-700 ease-out group-hover:scale-105`}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/5 to-transparent" />
              {/* Caption */}
              <div className="absolute inset-x-4 bottom-3 text-[12px] font-medium text-cream/90 sm:inset-x-5 sm:bottom-4 sm:text-[13px]">
                {t.caption}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
