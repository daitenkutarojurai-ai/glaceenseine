"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";

const tiles = [
  {
    src: "/camion-patronne.jpg",
    alt: "La caravane Glaces en Seine, vert tendre, sous les arbres du quai",
    span: "md:col-span-3 md:row-span-2",
    caption: "La caravane, sous les tilleuls",
  },
  {
    src: "/inprod.jpg",
    alt: "Préparation des crêpes au billig",
    span: "md:col-span-2",
    caption: "Le billig en plein service",
  },
  {
    src: "/affiche.jpg",
    alt: "Affiche Glaces en Seine",
    span: "md:col-span-2",
    caption: "Notre affiche d'été",
  },
  {
    src: "/camion.jpg",
    alt: "La caravane sur le quai",
    span: "md:col-span-3",
    caption: "Côté Seine, fin de journée",
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative scroll-mt-24 py-28 sm:py-36"
      aria-labelledby="experience-title"
    >
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute right-[-15%] top-10 h-[420px] w-[420px] rounded-blob bg-teal-100 opacity-60 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow">Sur les quais</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="experience-title"
                className="h-display mt-3 text-4xl sm:text-5xl"
              >
                Une halte{" "}
                <span className="font-script text-cherry">douce</span> au bord de
                la Seine.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <p className="text-[17px] leading-relaxed text-ink/70">
              On installe quelques tables sur l'herbe, les enfants courent
              jusqu'au ponton, les amoureux partagent un cornet à deux. La caravane
              sent bon le sucre chaud et la crème vanille — c'est notre version
              du dimanche idéal.
            </p>
          </Reveal>
        </div>

        {/* Image mosaic */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-5 md:auto-rows-[180px]">
          {tiles.map((t, i) => (
            <Reveal
              key={t.src}
              delay={i * 0.06}
              className={`group relative overflow-hidden rounded-3xl bg-cream-deep shadow-soft ${t.span}`}
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-90" />
              <div className="absolute inset-x-5 bottom-4 text-[13px] font-medium text-cream">
                {t.caption}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
