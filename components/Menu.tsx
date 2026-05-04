"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { IceCream, Cookie, CakeSlice, Coffee, Star, ChevronDown, Flame, Leaf, Info } from "lucide-react";

/* ── Allergen definitions ─────────────────────────────── */
type AllergenKey = "gluten" | "lait" | "oeufs" | "noisettes" | "pistache" | "soja";
const ALLERGEN_META: Record<AllergenKey, { label: string; color: string; dot: string }> = {
  gluten:    { label: "Gluten",    color: "bg-amber-100 text-amber-800 ring-amber-200",   dot: "bg-amber-400" },
  lait:      { label: "Lait",      color: "bg-blue-100 text-blue-800 ring-blue-200",      dot: "bg-blue-400"  },
  oeufs:     { label: "Œufs",      color: "bg-yellow-100 text-yellow-800 ring-yellow-200", dot: "bg-yellow-400" },
  noisettes: { label: "Noisettes", color: "bg-orange-100 text-orange-800 ring-orange-200", dot: "bg-orange-400" },
  pistache:  { label: "Pistache",  color: "bg-green-100 text-green-800 ring-green-200",   dot: "bg-green-500"  },
  soja:      { label: "Soja",      color: "bg-lime-100 text-lime-800 ring-lime-200",       dot: "bg-lime-500"   },
};

/* ── Data ─────────────────────────────────────────────── */
type Item = {
  name: string;
  desc: string;
  price: string;
  star?: boolean;
  ingredients: string;
  allergens: AllergenKey[];
  kcal: number;
  tip: string;
};

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
    tagline: "Glaces artisanales — parfums au choix, saveur spéciale chaque semaine",
    icon: IceCream,
    bg: "bg-rose-100",
    accent: "bg-rose-300/30",
    text: "text-cherry",
    items: [
      {
        name: "Une boule",
        desc: "Un parfum au choix",
        price: "3,50 €",
        ingredients: "Glace artisanale — parfums du jour",
        allergens: ["lait"],
        kcal: 120,
        tip: "Plusieurs parfums au choix selon arrivages, avec une saveur spéciale différente chaque semaine.",
      },
      {
        name: "Deux boules",
        desc: "Deux parfums au choix",
        price: "6 €",
        star: true,
        ingredients: "Glace artisanale — parfums du jour",
        allergens: ["lait"],
        kcal: 240,
        tip: "Demandez la saveur de la semaine — elle change tous les samedis.",
      },
      {
        name: "Trois boules",
        desc: "Trois parfums au choix",
        price: "7,50 €",
        ingredients: "Glace artisanale — parfums du jour",
        allergens: ["lait"],
        kcal: 360,
        tip: "Le format à partager — ou pour les gourmands.",
      },
    ],
  },
  {
    key: "crepes",
    label: "Crêpes",
    emoji: "🥞",
    tagline: "Crêpes sucrées — pâte du matin, dorée à la plaque",
    icon: Cookie,
    bg: "bg-sun-100",
    accent: "bg-sun-300/30",
    text: "text-ink",
    items: [
      {
        name: "Sucre cristal",
        desc: "Le classique",
        price: "2,50 €",
        star: true,
        ingredients: "Farine de blé, œufs, lait, beurre, sucre cristal",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 215,
        tip: "Le sucre cristal tient sous le beurre chaud et crée de petits points caramélisés.",
      },
      {
        name: "Pâte à tartiner",
        desc: "Une cuillère généreuse",
        price: "3,50 €",
        ingredients: "Farine de blé, œufs, lait, beurre, pâte à tartiner aux noisettes",
        allergens: ["gluten", "oeufs", "lait", "noisettes", "soja"],
        kcal: 460,
        tip: "Étalée après cuisson pour garder sa texture coulante.",
      },
      {
        name: "Caramel",
        desc: "Caramel doux",
        price: "3,50 €",
        ingredients: "Farine de blé, œufs, lait, beurre, caramel",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 360,
        tip: "Versé tiède sur la crêpe — il imprègne la pâte sans la détremper.",
      },
    ],
  },
  {
    key: "gaufres",
    label: "Gaufres",
    emoji: "🧇",
    tagline: "Gaufres sucrées — croustillantes dehors, moelleuses dedans",
    icon: CakeSlice,
    bg: "bg-teal-100",
    accent: "bg-teal-300/30",
    text: "text-teal-700",
    items: [
      {
        name: "La Foli's",
        desc: "Notre signature gourmande",
        price: "7,50 €",
        star: true,
        ingredients: "Gaufre, garniture maison",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 580,
        tip: "Notre coup de cœur de la carte — demandez la composition du jour.",
      },
      {
        name: "Sucre glace",
        desc: "Toute simple",
        price: "3,50 €",
        ingredients: "Farine de blé, œufs, lait, beurre, sucre, levure, sucre glace",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 280,
        tip: "Saupoudré juste avant de servir — la fine couche craque sous la dent.",
      },
      {
        name: "Pâte à tartiner",
        desc: "Coulante, généreuse",
        price: "4,50 €",
        ingredients: "Farine de blé, œufs, lait, beurre, sucre, levure, pâte à tartiner aux noisettes",
        allergens: ["gluten", "oeufs", "lait", "noisettes", "soja"],
        kcal: 505,
        tip: "On laisse tiédir 1 min avant d'étaler — la pâte reste coulante sans absorber.",
      },
      {
        name: "Caramel",
        desc: "Caramel doux",
        price: "4,50 €",
        ingredients: "Farine de blé, œufs, lait, beurre, sucre, levure, caramel",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 470,
        tip: "Le caramel s'infiltre dans les alvéoles de la gaufre — chaque bouchée est nappée.",
      },
    ],
  },
  {
    key: "boissons",
    label: "Boissons",
    emoji: "🥤",
    tagline: "Boissons soft & boissons chaudes — servies sur le quai",
    icon: Coffee,
    bg: "bg-sky-100",
    accent: "bg-sky-200/40",
    text: "text-sky-700",
    items: [
      {
        name: "Coca-Cola 33 cl",
        desc: "Canette fraîche",
        price: "2,50 €",
        ingredients: "Coca-Cola",
        allergens: [],
        kcal: 140,
        tip: "Servi bien frais.",
      },
      {
        name: "Tropico tropical 33 cl",
        desc: "Mélange de fruits tropicaux",
        price: "2,50 €",
        ingredients: "Boisson aux fruits Tropico",
        allergens: [],
        kcal: 140,
        tip: "Frais, fruité — parfait avec une gaufre.",
      },
      {
        name: "Fanta fruit du dragon 33 cl",
        desc: "Édition pétillante",
        price: "2,50 €",
        ingredients: "Fanta fruit du dragon",
        allergens: [],
        kcal: 130,
        tip: "Une note exotique légèrement acidulée.",
      },
      {
        name: "Perrier 33 cl",
        desc: "Eau gazeuse minérale",
        price: "2,50 €",
        ingredients: "Eau minérale gazeuse Perrier",
        allergens: [],
        kcal: 0,
        tip: "Les bulles désaltèrent et nettoient le palais entre deux saveurs.",
      },
      {
        name: "Eau 50 cl",
        desc: "Bouteille fraîche",
        price: "2 €",
        ingredients: "Eau minérale",
        allergens: [],
        kcal: 0,
        tip: "Format pratique pour la balade le long des quais.",
      },
      {
        name: "Vin bio sans alcool",
        desc: "Désalcoolisé, certifié bio",
        price: "4 €",
        ingredients: "Vin bio désalcoolisé",
        allergens: [],
        kcal: 30,
        tip: "Pour profiter de l'apéro sur le quai sans alcool.",
      },
      {
        name: "Bière sans alcool",
        desc: "Fraîche et légère",
        price: "4 €",
        ingredients: "Bière sans alcool",
        allergens: ["gluten"],
        kcal: 60,
        tip: "Idéale après une promenade ensoleillée.",
      },
      {
        name: "Café",
        desc: "Serré ou allongé",
        price: "2 €",
        star: true,
        ingredients: "Café",
        allergens: [],
        kcal: 5,
        tip: "Parfait après une glace — l'amertume équilibre le sucré.",
      },
      {
        name: "Thé",
        desc: "Servi chaud",
        price: "3 €",
        ingredients: "Thé",
        allergens: [],
        kcal: 0,
        tip: "Demandez la sélection du jour.",
      },
    ],
  },
];

/* ── Allergen chip ──────────────────────────────────────── */
function AllergenChip({ id }: { id: AllergenKey }) {
  const m = ALLERGEN_META[id];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${m.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

/* ── Expanded detail panel ──────────────────────────────── */
function ItemDetail({ item, accent }: { item: Item; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      className="overflow-hidden"
    >
      <div className={`mx-1 mb-2 rounded-2xl ${accent} px-4 py-3.5 text-[13px]`}>
        {/* Calories */}
        <div className="mb-3 flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-ink/8 px-3 py-1 text-[12px] font-semibold text-ink">
            <Flame className="h-3 w-3 text-cherry" />
            ≈ {item.kcal} kcal / portion
          </span>
        </div>

        {/* Ingredients */}
        <div className="mb-3">
          <p className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.15em] text-ink/40">
            Ingrédients
          </p>
          <p className="leading-relaxed text-ink/75">{item.ingredients}.</p>
        </div>

        {/* Allergens */}
        {item.allergens.length > 0 ? (
          <div className="mb-3">
            <p className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.15em] text-ink/40">
              Allergènes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.allergens.map((a) => <AllergenChip key={a} id={a} />)}
            </div>
          </div>
        ) : (
          <div className="mb-3 flex items-center gap-1.5">
            <Leaf className="h-3.5 w-3.5 text-teal-600" />
            <span className="text-[12px] font-medium text-teal-700">Sans allergène majeur</span>
          </div>
        )}

        {/* Health labels */}
        <div className="mb-3 flex flex-col gap-1">
          {item.kcal > 500 && (
            <p className="text-[12px] font-medium text-orange-600">
              ⚠️ À déguster avec modération
            </p>
          )}
          <p className="text-[11.5px] text-ink/45">
            Toutes les valeurs nutritionnelles sont approximatives
          </p>
        </div>

        {/* Tip */}
        <div className="flex gap-2 rounded-xl bg-cream/70 p-3">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/40" />
          <p className="text-[12.5px] leading-relaxed text-ink/70">{item.tip}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Menu item row / card ───────────────────────────────── */
function MenuItem({ item, cat, isLast }: { item: Item; cat: Cat; isLast: boolean }) {
  const [open, setOpen] = useState(false);

  if (item.star) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: open ? 0 : -2 }}
        className={`relative overflow-hidden rounded-3xl ${cat.bg} shadow-soft`}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full cursor-pointer p-5 text-left"
          aria-expanded={open}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/45">
                Coup de cœur
              </span>
              <h3 className="mt-1 font-display text-xl text-ink">{item.name}</h3>
              <p className="mt-0.5 text-[14px] text-ink/65">{item.desc}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <Star className={`h-4 w-4 ${cat.text} opacity-60 fill-current`} />
              <span className="rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-bold text-cream">
                {item.price}
              </span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`text-[12px] font-medium ${cat.text}`}>
              {cat.emoji} Artisanal
            </span>
            <span className="flex items-center gap-1 text-[12px] text-ink/40">
              <Flame className="h-3 w-3" />≈ {item.kcal} kcal
            </span>
            {item.allergens.length === 0 && (
              <span className="flex items-center gap-1 text-[12px] text-teal-600">
                <Leaf className="h-3 w-3" />Sans allergène
              </span>
            )}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="ml-auto text-ink/30"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </div>
        </button>
        <AnimatePresence>
          {open && <ItemDetail item={item} accent={cat.accent} />}
        </AnimatePresence>
      </motion.article>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className={!isLast ? "border-b border-ink/6" : ""}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-ink/[0.02]"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-[16px] text-ink">{item.name}</span>
            {item.allergens.length === 0 && (
              <Leaf className="h-3.5 w-3.5 shrink-0 text-teal-500" />
            )}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-[13px] leading-snug text-ink/55">{item.desc}</span>
            <span className="flex items-center gap-0.5 text-[12px] text-ink/35">
              <Flame className="h-3 w-3" />≈ {item.kcal} kcal
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-ink/8 px-3 py-1 text-[13px] font-semibold text-ink">
            {item.price}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-ink/30"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </div>
      </button>
      <AnimatePresence>
        {open && <ItemDetail item={item} accent="bg-ink/[0.03]" />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main export ────────────────────────────────────────── */
export function Menu() {
  const [active, setActive] = useState(categories[0].key);
  const cat = categories.find((c) => c.key === active)!;
  const starred = cat.items.filter((i) => i.star);
  const rest = cat.items.filter((i) => !i.star);
  const tabsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="menu"
      className="relative scroll-mt-20 bg-gradient-river py-16 sm:py-24"
      aria-labelledby="menu-title"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <Reveal>
          <p className="eyebrow text-center sm:text-left">Le menu</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="menu-title" className="h-display mt-2 text-center text-3xl sm:text-left sm:text-5xl">
            Quatre envies,{" "}
            <span className="font-script text-teal-700">une caravane</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.07}>
          <p className="mt-2 text-center text-[13.5px] text-ink/50 sm:text-left">
            Cliquez sur un article pour voir ingrédients, allergènes et calories.
          </p>
        </Reveal>

        {/* Allergen legend */}
        <Reveal delay={0.09}>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {(Object.keys(ALLERGEN_META) as AllergenKey[]).map((k) => (
              <AllergenChip key={k} id={k} />
            ))}
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700 ring-1 ring-teal-200">
              <Leaf className="h-2.5 w-2.5" />Sans allergène
            </span>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.11}>
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
                  className={`relative flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl px-5 py-3 text-[15px] font-semibold transition ${
                    isActive ? `${c.bg} ${c.text} shadow-soft` : "bg-cream/60 text-ink/55 hover:text-ink"
                  }`}
                >
                  <span className="text-xl leading-none" role="img" aria-hidden>{c.emoji}</span>
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
            <p className={`font-script text-2xl ${cat.text} text-center sm:text-left`}>
              {cat.tagline}
            </p>

            {/* Starred */}
            {starred.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {starred.map((item) => (
                  <MenuItem key={item.name} item={item} cat={cat} isLast={false} />
                ))}
              </div>
            )}

            {/* Regular */}
            {rest.length > 0 && (
              <div className="mt-4 overflow-hidden rounded-3xl bg-cream shadow-soft">
                {rest.map((item, i) => (
                  <MenuItem key={item.name} item={item} cat={cat} isLast={i === rest.length - 1} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-[13px] text-ink/45">
            Suppléments : chantilly +1 € · brochette de bonbons 2 € ·
            carte indicative · parfums selon arrivages · prix susceptibles de varier ·
            contamination croisée possible en cuisine — signalez vos allergies sévères ·
            Nos produits sont artisanaux, préparés sur place.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
