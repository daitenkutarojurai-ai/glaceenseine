"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

const CARDS = [
  {
    label: "Mariage & PACS",
    desc: "Une halte gourmande qui ravit petits et grands.",
    emoji: "💍",
    href: "/privatisation#formules",
    accent: "from-cherry/30 via-rose-100/40 to-cream",
    ring: "ring-cherry/20",
    badge: "bg-cherry text-cream",
  },
  {
    label: "Entreprise",
    desc: "Séminaires, journées d'équipe, pots de départ.",
    emoji: "🏢",
    href: "/privatisation#formules",
    accent: "from-teal-300/30 via-teal-100/40 to-cream",
    ring: "ring-teal-500/20",
    badge: "bg-teal-500 text-cream",
  },
  {
    label: "Anniversaire",
    desc: "Une animation qui change des bougies.",
    emoji: "🎉",
    href: "/privatisation#formules",
    accent: "from-sun-300/40 via-sun-100/40 to-cream",
    ring: "ring-amber-400/25",
    badge: "bg-amber-400 text-ink",
  },
  {
    label: "Fête de quartier",
    desc: "Brocantes, vide-greniers, kermesses.",
    emoji: "🎪",
    href: "/privatisation#formules",
    accent: "from-peach-100/60 via-rose-100/30 to-cream",
    ring: "ring-rose-300/30",
    badge: "bg-rose-300 text-ink",
  },
];

const HIGHLIGHTS = [
  { label: "Île-de-France", sub: "rayon ~40 km" },
  { label: "Devis gratuit", sub: "réponse sous 48 h" },
  { label: "Sur-mesure", sub: "parfums & déco" },
];

export function PrivatisationTeaser() {
  return (
    <section
      id="privatisation"
      className="scroll-mt-24 py-16 sm:py-24"
      aria-labelledby="priv-teaser-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink via-ink to-ink/95 text-cream shadow-ring">
          {/* Decorative ambient glows */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cherry/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="pointer-events-none absolute right-1/3 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-sun-300/15 blur-3xl" />

          <div className="relative grid gap-0 lg:grid-cols-[1.1fr_1fr]">
            {/* ── Left — copy ── */}
            <div className="px-7 py-12 sm:px-12 sm:py-16 lg:py-20">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300 ring-1 ring-inset ring-cream/15 backdrop-blur">
                  <Sparkles className="h-3 w-3" />
                  Privatisation
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2
                  id="priv-teaser-title"
                  className="h-display mt-4 text-3xl leading-[1.05] text-cream sm:text-4xl lg:text-[2.75rem]"
                >
                  La caravane,{" "}
                  <span className="font-script text-sun-300">rien que</span>{" "}
                  pour vous.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-cream/70">
                  Mariage au bord de l&apos;eau, séminaire d&apos;entreprise,
                  anniversaire mémorable — on amène la caravane, la plaque
                  chaude et les glaces artisanales. Vous apportez les invités.
                </p>
              </Reveal>

              {/* Highlights row */}
              <Reveal delay={0.14}>
                <ul className="mt-7 grid grid-cols-3 gap-3">
                  {HIGHLIGHTS.map((h) => (
                    <li
                      key={h.label}
                      className="rounded-2xl bg-cream/6 px-3 py-3 ring-1 ring-inset ring-cream/10 backdrop-blur"
                    >
                      <div className="text-[12.5px] font-semibold text-cream/95">
                        {h.label}
                      </div>
                      <div className="mt-0.5 text-[11px] text-cream/55">
                        {h.sub}
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href="/privatisation"
                    className="btn-liquid group inline-flex items-center gap-2 rounded-full bg-cherry px-7 py-3.5 text-sm font-semibold text-cream shadow-glow-cherry transition hover:-translate-y-0.5"
                  >
                    Demander un devis
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/privatisation#formules"
                    className="text-[13.5px] font-semibold text-cream/70 transition hover:text-cream"
                  >
                    Voir les formules →
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* ── Right — event grid ── */}
            <div className="relative flex items-center px-7 pb-12 sm:px-12 sm:pb-16 lg:py-12 lg:pl-2 lg:pr-12">
              <div className="grid w-full grid-cols-2 gap-4">
                {CARDS.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={c.href}
                      className={`group relative flex h-full min-h-[148px] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${c.accent} p-5 shadow-soft ring-1 ring-inset ${c.ring} transition hover:-translate-y-1 hover:shadow-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry`}
                      aria-label={`Privatisation — ${c.label}`}
                    >
                      {/* Top-right floating emoji medallion */}
                      <span
                        className={`absolute -right-3 -top-3 grid h-14 w-14 place-items-center rounded-full text-2xl shadow-soft ring-2 ring-cream/60 transition group-hover:rotate-6 ${c.badge}`}
                        aria-hidden
                      >
                        {c.emoji}
                      </span>

                      {/* Content pinned to bottom for consistent baseline */}
                      <div className="relative">
                        <div className="font-display text-[15px] font-semibold text-ink">
                          {c.label}
                        </div>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-ink/65">
                          {c.desc}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
