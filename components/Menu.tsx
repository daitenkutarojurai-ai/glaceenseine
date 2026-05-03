"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { IceCream, Cookie, CakeSlice, Star } from "lucide-react";

type Item = { name: string; desc: string; price: string; star?: boolean };
type Cat = {
  key: string;
  label: string;
  emoji: string;
  tagline: string;
  icon: typeof IceCream;
  bg: string;
  accent: string;
  text: string;
  items: Item[];
};

const categories: Cat[] = [
  {
    key: "glaces",
    label: "Glaces",
    emoji: "🍦",
    tagline: "Boules onctueuses — parfums de saison",
    icon: IceCream,
    bg: "bg-rose-100",
    accent: "bg-rose-300/30",
    text: "text-cherry",
    items: [
      { name: "Vanille de Madagascar", desc: "Crème entière, gousse infusée 24 h", price: "3 €", star: true },
      { name: "Fraise du Vexin", desc: "Fruits frais, sirop léger", price: "3,50 €" },
      { name: "Pistache", desc: "Pâte de pistache de Bronte", price: "3,50 €" },
      { name: "Caramel beurre salé", desc: "Beurre de baratte, fleur de sel", price: "3,50 €", star: true },
      { name: "Chocolat noir 70 %", desc: "Cacao Valrhona", price: "3 €" },
      { name: "Sorbet citron", desc: "Pressé minute, zeste râpé", price: "3 €" },
    ],
  },
  {
    key: "crepes",
    label: "Crêpes",
    emoji: "🥞",
    tagline: "Pâte du matin — dorée au billig",
    icon: Cookie,
    bg: "bg-sun-100",
    accent: "bg-sun-300/30",
    text: "text-ink",
    items: [
      { name: "Beurre · sucre · citron", desc: "Le grand classique breton", price: "3 €", star: true },
      { name: "Nutella", desc: "Une cuillère généreuse", price: "3,50 €" },
      { name: "Caramel beurre salé", desc: "Notre caramel maison", price: "3,50 €", star: true },
      { name: "Confiture maison", desc: "Fraise, abricot ou châtaigne", price: "3 €" },
      { name: "Banane · chocolat", desc: "Banane fraîche, ganache tiède", price: "4 €" },
      { name: "Sucre", desc: "Cassonade ou cristal", price: "2,50 €" },
    ],
  },
  {
    key: "gaufres",
    label: "Gaufres",
    emoji: "🧇",
    tagline: "Croustillantes dehors — moelleuses dedans",
    icon: CakeSlice,
    bg: "bg-teal-100",
    accent: "bg-teal-300/30",
    text: "text-teal-700",
    items: [
      { name: "Folie chocolat", desc: "Boule de glace, sauce chaude, chantilly", price: "6 €", star: true },
      { name: "Fraises · chantilly", desc: "Fraises fraîches, crème montée minute", price: "5 €", star: true },
      { name: "Caramel · noisettes", desc: "Caramel maison, noisettes torréfiées", price: "4,50 €" },
      { name: "Nutella", desc: "Coulant, généreux", price: "4 €" },
      { name: "Chantilly maison", desc: "Crème montée minute", price: "4 €" },
      { name: "Sucre glace", desc: "Toute simple", price: "3 €" },
    ],
  },
];

export function Menu() {
  const [active, setActive] = useState(categories[0].key);
  const cat = categories.find((c) => c.key === active)!;
  const starred = cat.items.filter((i) => i.star);
  const rest = cat.items.filter((i) => !i.star);
  const tabsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="menu"
      className="relative scroll-mt-20 bg-gradient-river py-20 sm:py-32"
      aria-labelledby="menu-title"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <Reveal>
          <p className="eyebrow text-center sm:text-left">La carte</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="menu-title"
            className="h-display mt-2 text-center text-3xl sm:text-left sm:text-5xl"
          >
            Trois envies,{" "}
            <span className="font-script text-teal-700">une caravane</span>.
          </h2>
        </Reveal>

        {/* Tab selector — horizontal scroll on mobile */}
        <Reveal delay={0.1}>
          <div
            ref={tabsRef}
            className="no-scrollbar mt-8 flex gap-3 overflow-x-auto pb-1 sm:justify-start"
            role="tablist"
            aria-label="Catégories"
          >
            {categories.map((c) => {
              const isActive = c.key === active;
              return (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(c.key)}
                  className={`relative flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 text-[15px] font-semibold transition ${
                    isActive
                      ? `${c.bg} ${c.text} shadow-soft`
                      : "bg-cream/60 text-ink/55 hover:text-ink"
                  }`}
                >
                  <span className="text-xl leading-none" role="img" aria-hidden>
                    {c.emoji}
                  </span>
                  {c.label}
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-current opacity-40"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Category panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6"
            role="tabpanel"
          >
            {/* Tagline */}
            <p className={`font-script text-2xl ${cat.text} text-center sm:text-left`}>
              {cat.tagline}
            </p>

            {/* Starred / coup de cœur items */}
            {starred.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {starred.map((item, i) => (
                  <motion.article
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -3 }}
                    className={`relative overflow-hidden rounded-3xl ${cat.bg} p-5 shadow-soft`}
                  >
                    <span className={`absolute right-4 top-4 ${cat.text} opacity-60`}>
                      <Star className="h-4 w-4 fill-current" />
                    </span>
                    <div className="pr-6">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/45">
                        Coup de cœur
                      </span>
                      <h3 className="mt-1 font-display text-xl text-ink">{item.name}</h3>
                      <p className="mt-0.5 text-[14px] text-ink/65">{item.desc}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className={`text-[13px] font-medium ${cat.text}`}>
                        {cat.emoji} Artisanal
                      </span>
                      <span className="rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-bold text-cream">
                        {item.price}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {/* Regular items — clean list */}
            <div className="mt-4 overflow-hidden rounded-3xl bg-cream shadow-soft">
              {rest.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className={`flex items-center justify-between gap-4 px-5 py-4 ${
                    i < rest.length - 1 ? "border-b border-ink/6" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <div className="truncate font-display text-[16px] text-ink">{item.name}</div>
                    <div className="mt-0.5 text-[13px] leading-snug text-ink/55">{item.desc}</div>
                  </div>
                  <span className="shrink-0 rounded-full bg-ink/8 px-3 py-1 text-[13px] font-semibold text-ink">
                    {item.price}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-[13px] text-ink/50">
            Carte indicative · parfums selon arrivages · prix susceptibles de varier
          </p>
        </Reveal>
      </div>
    </section>
  );
}
