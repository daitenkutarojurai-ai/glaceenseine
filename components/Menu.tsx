"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { IceCream, Cookie, CakeSlice } from "lucide-react";

type Item = { name: string; desc: string; price: string };
type Cat = {
  key: string;
  label: string;
  tagline: string;
  icon: typeof IceCream;
  swatch: string; // tailwind bg color for chip background
  items: Item[];
};

const categories: Cat[] = [
  {
    key: "glaces",
    label: "Glaces artisanales",
    tagline: "Boules onctueuses, parfums de saison",
    icon: IceCream,
    swatch: "bg-rose-100",
    items: [
      { name: "Vanille de Madagascar", desc: "Crème entière, gousse infusée 24 h", price: "3 €" },
      { name: "Chocolat noir 70 %", desc: "Cacao Valrhona, sans lait ajouté", price: "3 €" },
      { name: "Fraise du Vexin", desc: "Fruits frais, juste sucrés au sirop", price: "3,50 €" },
      { name: "Pistache", desc: "Pâte de pistache de Bronte", price: "3,50 €" },
      { name: "Sorbet citron", desc: "Pressé minute, zeste râpé", price: "3 €" },
      { name: "Caramel beurre salé", desc: "Beurre de baratte, fleur de sel", price: "3,50 €" },
    ],
  },
  {
    key: "crepes",
    label: "Crêpes minute",
    tagline: "Pâte du matin, dorée au billig",
    icon: Cookie,
    swatch: "bg-sun-100",
    items: [
      { name: "Sucre", desc: "Cassonade ou cristal", price: "2,50 €" },
      { name: "Nutella", desc: "Une cuillère généreuse", price: "3,50 €" },
      { name: "Beurre · sucre · citron", desc: "Le grand classique breton", price: "3 €" },
      { name: "Confiture maison", desc: "Fraise, abricot ou châtaigne", price: "3 €" },
      { name: "Caramel beurre salé", desc: "Notre maison", price: "3,50 €" },
      { name: "Banane · chocolat", desc: "Banane fraîche, ganache tiède", price: "4 €" },
    ],
  },
  {
    key: "gaufres",
    label: "Gaufres de Bruxelles",
    tagline: "Croustillantes dehors, moelleuses dedans",
    icon: CakeSlice,
    swatch: "bg-teal-100",
    items: [
      { name: "Sucre glace", desc: "Toute simple", price: "3 €" },
      { name: "Nutella", desc: "Coulant, généreux", price: "4 €" },
      { name: "Chantilly maison", desc: "Crème montée minute", price: "4 €" },
      { name: "Fraises · chantilly", desc: "Quand la saison le veut", price: "5 €" },
      { name: "Caramel · noisettes", desc: "Caramel maison, noisettes torréfiées", price: "4,50 €" },
      { name: "Folie chocolat", desc: "Boule de glace, sauce chaude, chantilly", price: "6 €" },
    ],
  },
];

export function Menu() {
  const [active, setActive] = useState(categories[0].key);
  const cat = categories.find((c) => c.key === active)!;

  return (
    <section
      id="menu"
      className="relative scroll-mt-24 bg-gradient-river py-28 sm:py-36"
      aria-labelledby="menu-title"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">La carte</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="menu-title"
                className="h-display mt-3 max-w-xl text-4xl sm:text-5xl"
              >
                Trois envies,{" "}
                <span className="font-script text-teal-700">une caravane</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink/70">
                Notre carte est courte par choix : ce qu'on aime faire, on le fait
                bien. Elle bouge un peu chaque mois, au gré des fruits.
              </p>
            </Reveal>
          </div>

          {/* Tabs */}
          <Reveal delay={0.15} className="w-full md:w-auto">
            <div className="flex w-full flex-wrap gap-2 rounded-2xl bg-cream/70 p-2 shadow-soft backdrop-blur md:w-auto">
              {categories.map((c) => {
                const Icon = c.icon;
                const isActive = c.key === active;
                return (
                  <button
                    key={c.key}
                    onClick={() => setActive(c.key)}
                    className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      isActive ? "text-ink" : "text-ink/55 hover:text-ink"
                    }`}
                    aria-pressed={isActive}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="menu-pill"
                        className="absolute inset-0 -z-0 rounded-xl bg-cream shadow-soft"
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    )}
                    <Icon className="relative z-10 h-4 w-4" />
                    <span className="relative z-10 whitespace-nowrap">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Items grid */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {cat.items.map((item, i) => (
                <motion.article
                  key={item.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-3xl bg-cream p-6 shadow-soft transition hover:shadow-ring"
                >
                  <span
                    className={`absolute -right-8 -top-8 h-28 w-28 rounded-full ${cat.swatch} opacity-50 blur-xl transition-transform duration-500 group-hover:scale-125`}
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg text-ink">{item.name}</h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-ink/60">
                        {item.desc}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-ink px-3 py-1 text-[13px] font-semibold text-cream">
                      {item.price}
                    </span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal delay={0.05}>
            <p className="mt-8 text-center font-script text-2xl text-teal-700">
              {cat.tagline}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
