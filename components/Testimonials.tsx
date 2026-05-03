"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Quote, Facebook, Star } from "lucide-react";

const reviews = [
  {
    name: "Anne-Laure G.",
    text: "Testé avec les enfants cet après-midi et très bonnes glaces. Merci pour cette idée !",
    stars: 5,
    via: "Facebook",
  },
  {
    name: "Borgy D.",
    text: "Quelle excellente idée !! Un peu d'animation sur les rives de Seine... Bravo 👏",
    stars: 5,
    via: "Facebook",
  },
  {
    name: "Evelyne L.",
    text: "C'est super. 👍 un petit plus pour se promener sur les bords de Seine.",
    stars: 5,
    via: "Facebook",
  },
  {
    name: "Alain B.",
    text: "Voilà quelque chose qui manquait aux berges de Seine ! Super ! 🙂👍👏",
    stars: 5,
    via: "Facebook",
  },
  {
    name: "Alberto C.",
    text: "Super une petite pause gourmande. À très vite !",
    stars: 5,
    via: "Facebook",
  },
];

export function Testimonials() {
  return (
    <section
      id="avis"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-32"
      aria-labelledby="avis-title"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-blob bg-sun-100 opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-blob bg-rose-100 opacity-60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <Reveal>
            <p className="eyebrow flex items-center justify-center gap-2">
              <Quote className="h-3.5 w-3.5" /> Ils ont goûté
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="avis-title"
              className="h-display mt-2 text-3xl sm:text-5xl"
            >
              Ce que disent{" "}
              <span className="font-script text-cherry">les promeneurs</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-3 max-w-md text-[16px] text-ink/60">
              259 personnes ont réagi à notre première saison sur les quais.
              Voici quelques mots qui nous réchauffent le cœur.
            </p>
          </Reveal>
        </div>

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.07}>
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="relative h-full rounded-3xl bg-cream p-6 shadow-soft ring-1 ring-ink/5"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-sun-500 text-sun-500" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mt-3 text-[15.5px] leading-relaxed text-ink/80">
                  "{r.text}"
                </blockquote>

                {/* Author */}
                <div className="mt-4 flex items-center justify-between border-t border-ink/6 pt-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-sun text-xs font-bold text-ink">
                      {r.name[0]}
                    </span>
                    <span className="text-[13px] font-semibold text-ink">{r.name}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-ink/40">
                    <Facebook className="h-3 w-3" /> {r.via}
                  </span>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* Aggregate social proof */}
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 rounded-3xl bg-cream/60 px-6 py-5 shadow-soft backdrop-blur">
            {[
              { n: "259", label: "J'aime Facebook" },
              { n: "18", label: "Commentaires" },
              { n: "131", label: "Réactions post vidéo" },
              { n: "5 ★", label: "Satisfaction unanime" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl text-ink">{s.n}</div>
                <div className="mt-0.5 text-[12px] text-ink/55">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
