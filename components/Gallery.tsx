"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

/* ── Photos ──────────────────────────────────────────── */
const PHOTOS = [
  {
    src: "/inprod.jpg",
    alt: "Préparation des crêpes au billig",
    caption: "Le billig en plein service",
  },
  {
    src: "/camion-patronne.jpg",
    alt: "La caravane et ses fondatrices",
    caption: "La caravane, sous les tilleuls",
  },
];

export function Gallery() {
  return (
    <section
      id="galerie"
      className="scroll-mt-20 py-10 sm:py-16"
      aria-labelledby="gallery-title"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Sur les quais</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="gallery-title"
            className="h-display mt-1 text-2xl sm:text-3xl"
          >
            Une halte{" "}
            <span className="font-script text-cherry">douce</span>{" "}
            au bord de la Seine.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ink/55">
            On installe quelques tables sur l&apos;herbe, les enfants courent
            jusqu&apos;au ponton, les amoureux partagent un cornet à deux.
            La caravane sent bon le sucre chaud et la crème vanille.
          </p>
        </Reveal>

        {/* 2 photos — 2-column grid */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-2">
          {PHOTOS.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-deep shadow-soft sm:aspect-video"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-4 right-4 text-[12px] font-medium text-cream/90 drop-shadow-sm">
                {p.caption}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
