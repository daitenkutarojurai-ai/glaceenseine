"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Briefcase, PartyPopper, Users } from "lucide-react";
import { Reveal } from "./Reveal";

const CARDS = [
  { icon: Heart,        color: "bg-rose-100 text-cherry",    label: "Mariage & PACS" },
  { icon: Briefcase,    color: "bg-teal-100 text-teal-700",  label: "Entreprise" },
  { icon: PartyPopper,  color: "bg-sun-100 text-ink",        label: "Anniversaire" },
  { icon: Users,        color: "bg-peach-100 text-cherry",   label: "Fête & brocante" },
];

export function PrivatisationTeaser() {
  return (
    <section
      id="privatisation"
      className="scroll-mt-24 py-16 sm:py-24"
      aria-labelledby="priv-teaser-title"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-ink text-cream shadow-ring">
          <div className="grid gap-0 lg:grid-cols-2">

            {/* Left — copy */}
            <div className="px-8 py-10 sm:px-12 sm:py-14">
              <Reveal>
                <p className="eyebrow text-teal-400">Privatisation</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2
                  id="priv-teaser-title"
                  className="h-display mt-2 text-3xl text-cream sm:text-4xl"
                >
                  La caravane,{" "}
                  <span className="font-script text-sun-300">rien que</span>{" "}
                  pour vous.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-[15px] leading-relaxed text-cream/65">
                  Mariage au bord de l&apos;eau, séminaire d&apos;entreprise,
                  anniversaire mémorable — on amène la caravane, le billig chaud
                  et les glaces artisanales. Vous apportez les invités.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <ul className="mt-5 space-y-2 text-[14px] text-cream/60">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    Déplacement en Île-de-France (rayon ~40 km)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    Devis gratuit · réponse sous 48 h
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    Personnalisation parfums & décoration
                  </li>
                </ul>
              </Reveal>
              <Reveal delay={0.2}>
                <Link
                  href="/privatisation"
                  className="btn-liquid group mt-8 inline-flex items-center gap-2 rounded-full bg-cherry px-7 py-3.5 text-sm font-semibold text-cream shadow-glow-cherry transition"
                >
                  Demander un devis
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>

            {/* Right — event type grid */}
            <div className="flex items-center bg-cream/5 px-8 py-10 sm:px-12 sm:py-14">
              <div className="grid w-full grid-cols-2 gap-4">
                {CARDS.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-start gap-3 rounded-2xl bg-cream/8 p-5 transition"
                  >
                    <span className={`grid h-11 w-11 place-items-center rounded-xl ${c.color}`}>
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span className="text-[14px] font-semibold text-cream/90">{c.label}</span>
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
