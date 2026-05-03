"use client";

import { motion } from "framer-motion";
import { Leaf, Hand, Heart, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

const pillars = [
  {
    icon: Hand,
    title: "Fait main, chaque matin",
    text: "Pâte à crêpes battue à l'aube, gaufres dorées au fer, glaces préparées en petites séries.",
    accent: "bg-peach-100",
    ring: "ring-peach-300/60",
  },
  {
    icon: Leaf,
    title: "Local, et c'est tout",
    text: "Lait de la ferme du Vexin, œufs des pondeuses du coin, fruits des vergers d'Île-de-France quand la saison le permet.",
    accent: "bg-teal-100",
    ring: "ring-teal-300/60",
  },
  {
    icon: Heart,
    title: "Le plaisir d'un dimanche",
    text: "On installe la caravane sur le quai, on sourit aux promeneurs, on parle aux enfants. C'est ça, l'idée.",
    accent: "bg-rose-100",
    ring: "ring-rose-300/60",
  },
];

export function Concept() {
  return (
    <section
      id="concept"
      className="relative scroll-mt-24 py-28 sm:py-36"
      aria-labelledby="concept-title"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sun-100 opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-teal-100 opacity-60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="eyebrow flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" /> Le concept
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="concept-title"
            className="h-display mt-3 max-w-2xl text-4xl sm:text-5xl"
          >
            Une caravane{" "}
            <span className="font-script text-cherry">artisanale</span>,
            posée au bord de l'eau.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink/70">
            Pas de chaîne, pas de poudre. Juste deux sœurs, une caravane vert tendre,
            et l'envie de ralentir le dimanche autour d'une glace bien fraîche ou
            d'une crêpe encore tiède.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={0.1 + i * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className={`group relative h-full rounded-3xl bg-cream p-7 shadow-soft ring-1 ${p.ring} transition`}
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${p.accent} text-ink`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-ink">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
                    {p.text}
                  </p>
                  <div
                    className={`pointer-events-none absolute inset-x-7 bottom-5 h-px origin-left scale-x-0 bg-ink/15 transition-transform duration-500 group-hover:scale-x-100`}
                  />
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
