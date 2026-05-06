"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { IceCream, Cookie, CakeSlice, Coffee, ChevronDown, Flame, Leaf, Info } from "lucide-react";

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
  /* Per-item emoji — related to the category but visually distinct from siblings. */
  emoji: string;
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
  cardBg: string; // gradient for the small product cards (attente-style)
  items: Item[];
};

const categories: Cat[] = [
  {
    key: "glaces",
    label: "Glaces",
    emoji: "🍦",
    tagline: "Glaces artisanales · parfums au choix, saveur spéciale chaque semaine",
    icon: IceCream,
    bg: "bg-rose-100",
    accent: "bg-rose-300/30",
    text: "text-cherry",
    cardBg: "bg-gradient-to-br from-rose-100 to-white",
    items: [
      {
        name: "Une boule",
        desc: "Un parfum au choix",
        price: "3,50 €",
        emoji: "🍧",
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
        emoji: "🍒",
        ingredients: "Glace artisanale — parfums du jour",
        allergens: ["lait"],
        kcal: 240,
        tip: "Demandez la saveur de la semaine — elle change toutes les semaines.",
      },
      {
        name: "Trois boules",
        desc: "Trois parfums au choix",
        price: "7,50 €",
        emoji: "🍨",
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
    tagline: "Crêpes sucrées · pâte du matin, dorée à la plaque",
    icon: Cookie,
    bg: "bg-sun-100",
    accent: "bg-sun-300/30",
    text: "text-ink",
    cardBg: "bg-gradient-to-br from-sun-100 to-white",
    items: [
      {
        name: "Sucre cristal",
        desc: "Le classique",
        price: "2,50 €",
        star: true,
        emoji: "🥞",
        ingredients: "Farine de blé, œufs, lait, beurre, sucre cristal",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 215,
        tip: "Le sucre cristal tient sous le beurre chaud et crée de petits points caramélisés.",
      },
      {
        name: "Pâte à tartiner",
        desc: "Une cuillère généreuse",
        price: "3,50 €",
        emoji: "🍫",
        ingredients: "Farine de blé, œufs, lait, beurre, pâte à tartiner aux noisettes",
        allergens: ["gluten", "oeufs", "lait", "noisettes", "soja"],
        kcal: 350,
        tip: "Étalée après cuisson pour garder sa texture coulante.",
      },
      {
        name: "Caramel",
        desc: "Caramel doux",
        price: "3,50 €",
        emoji: "🍯",
        ingredients: "Farine de blé, œufs, lait, beurre, caramel",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 290,
        tip: "Versé tiède sur la crêpe — il imprègne la pâte sans la détremper.",
      },
    ],
  },
  {
    key: "gaufres",
    label: "Gaufres",
    emoji: "🧇",
    tagline: "Gaufres sucrées · croustillantes dehors, moelleuses dedans",
    icon: CakeSlice,
    bg: "bg-teal-100",
    accent: "bg-teal-300/30",
    text: "text-teal-700",
    cardBg: "bg-gradient-to-br from-cream-deep to-cream",
    items: [
      {
        name: "La Foli's",
        desc: "Notre signature gourmande",
        price: "7,50 €",
        star: true,
        emoji: "🌟",
        ingredients: "Gaufre, garniture du jour",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 560,
        tip: "Notre coup de cœur de la carte — demandez la composition du jour.",
      },
      {
        name: "Sucre glace",
        desc: "Toute simple",
        price: "3,50 €",
        emoji: "🧇",
        ingredients: "Farine de blé, œufs, lait, beurre, sucre, levure, sucre glace",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 290,
        tip: "Saupoudré juste avant de servir — la fine couche craque sous la dent.",
      },
      {
        name: "Pâte à tartiner",
        desc: "Coulante, généreuse",
        price: "4,50 €",
        emoji: "🍫",
        ingredients: "Farine de blé, œufs, lait, beurre, sucre, levure, pâte à tartiner aux noisettes",
        allergens: ["gluten", "oeufs", "lait", "noisettes", "soja"],
        kcal: 450,
        tip: "On laisse tiédir 1 min avant d'étaler — la pâte reste coulante sans absorber.",
      },
      {
        name: "Caramel",
        desc: "Caramel doux",
        price: "4,50 €",
        emoji: "🍯",
        ingredients: "Farine de blé, œufs, lait, beurre, sucre, levure, caramel",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 380,
        tip: "Le caramel s'infiltre dans les alvéoles de la gaufre — chaque bouchée est nappée.",
      },
    ],
  },
  {
    key: "boissons",
    label: "Boissons",
    emoji: "🥤",
    tagline: "Boissons soft & boissons chaudes · servies sur le quai",
    icon: Coffee,
    bg: "bg-sky-100",
    accent: "bg-sky-200/40",
    text: "text-sky-700",
    cardBg: "bg-gradient-to-br from-sky-100 to-white",
    items: [
      {
        name: "Coca-Cola classique 33 cl",
        desc: "Canette fraîche",
        price: "2,50 €",
        emoji: "🥤",
        ingredients: "Coca-Cola classique",
        allergens: [],
        kcal: 139,
        tip: "Servi bien frais (version classique, ≈ 35 g de sucre).",
      },
      {
        name: "Tropico tropical 33 cl",
        desc: "Mélange de fruits tropicaux",
        price: "2,50 €",
        emoji: "🍹",
        ingredients: "Boisson aux fruits Tropico",
        allergens: [],
        kcal: 150,
        tip: "Frais, fruité — parfait avec une gaufre.",
      },
      {
        name: "Fanta fruit du dragon 33 cl",
        desc: "Édition pétillante",
        price: "2,50 €",
        emoji: "🐉",
        ingredients: "Fanta fruit du dragon",
        allergens: [],
        kcal: 110,
        tip: "Une note exotique légèrement acidulée.",
      },
      {
        name: "Perrier 33 cl",
        desc: "Eau gazeuse minérale",
        price: "2,50 €",
        emoji: "💧",
        ingredients: "Eau minérale gazeuse Perrier",
        allergens: [],
        kcal: 0,
        tip: "Les bulles désaltèrent et nettoient le palais entre deux saveurs.",
      },
      {
        name: "Eau 50 cl",
        desc: "Bouteille fraîche",
        price: "2 €",
        emoji: "🧊",
        ingredients: "Eau minérale",
        allergens: [],
        kcal: 0,
        tip: "Format pratique pour la balade le long des quais.",
      },
      {
        name: "Vin bio sans alcool",
        desc: "Désalcoolisé, certifié bio",
        price: "4 €",
        emoji: "🍷",
        ingredients: "Vin bio désalcoolisé",
        allergens: [],
        kcal: 35,
        tip: "Pour profiter de l'apéro sur le quai sans alcool (verre 12 cl).",
      },
      {
        name: "Bière sans alcool",
        desc: "Fraîche et légère",
        price: "4 €",
        emoji: "🍺",
        ingredients: "Bière sans alcool",
        allergens: ["gluten"],
        kcal: 75,
        tip: "Idéale après une promenade ensoleillée.",
      },
      {
        name: "Café",
        desc: "Serré ou allongé",
        price: "2 €",
        star: true,
        emoji: "☕",
        ingredients: "Café",
        allergens: [],
        kcal: 5,
        tip: "Parfait après une glace — l'amertume équilibre le sucré.",
      },
      {
        name: "Thé",
        desc: "Servi chaud",
        price: "3 €",
        emoji: "🍵",
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

/* ── Product card (attente.html style) ──────────────────── */
function ProductCard({
  item,
  cat,
  isOpen,
  onToggle,
  badge,
}: {
  item: Item;
  cat: Cat;
  isOpen: boolean;
  onToggle: () => void;
  badge?: { label: string; color: "cherry" | "teal" };
}) {
  const ringClass = item.star ? "ring-2 ring-cherry" : "ring-1 ring-ink/5";
  const badgeBg =
    badge?.color === "cherry"
      ? "bg-cherry shadow-[0_4px_14px_-4px_rgba(226,107,92,0.6)]"
      : "bg-teal-700 shadow-[0_4px_14px_-4px_rgba(46,132,117,0.6)]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: isOpen ? 0 : -2 }}
      transition={{ duration: 0.25 }}
      className={`relative ${cat.cardBg} ${ringClass} rounded-2xl shadow-soft`}
    >
      {badge && (
        <span
          className={`absolute -top-2.5 right-3 z-10 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold tracking-[0.02em] text-white whitespace-nowrap ${badgeBg}`}
        >
          {badge.label}
        </span>
      )}
      <button
        type="button"
        onClick={onToggle}
        className="block w-full cursor-pointer rounded-2xl p-4 text-left sm:p-3.5"
        aria-expanded={isOpen}
      >
        <span className="block text-[28px] leading-none drop-shadow-sm sm:text-[22px]" aria-hidden>
          {item.emoji}
        </span>
        <div className="mt-1.5 flex items-center gap-1.5">
          <h3 className="font-display text-[15px] font-semibold leading-tight text-ink">
            {item.name}
          </h3>
          {item.allergens.length === 0 && (
            <Leaf className="h-3 w-3 shrink-0 text-teal-600" aria-label="Sans allergène majeur" />
          )}
        </div>
        <p className="mt-0.5 min-h-[28px] text-[12px] leading-snug text-ink/55">
          {item.desc}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-ink px-2.5 py-1 text-[12.5px] font-bold text-cream">
            {item.price}
          </span>
          <span className="flex items-center gap-0.5 text-[11px] text-ink/35">
            <Flame className="h-3 w-3" />≈ {item.kcal} kcal
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="ml-auto text-ink/30"
            aria-hidden
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </div>
      </button>
    </motion.article>
  );
}

/* ── La Foli's signature card (Choix de l'équipe) ───────── */
function FoliCard({
  item,
  isOpen,
  onToggle,
}: {
  item: Item;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: isOpen ? 0 : -2 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-3xl border border-sun-300/60 bg-gradient-to-br from-sun-100 via-peach-100 to-sun-300 shadow-ring"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 100% 0%, rgba(255,255,255,0.55), transparent 60%)",
        }}
      />
      <button
        type="button"
        onClick={onToggle}
        className="relative flex w-full cursor-pointer items-center gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
        aria-expanded={isOpen}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/lafolisup.png?v=6"
          alt="La Foli's — coupelle gaufre, chantilly, cubes croustillants"
          className="h-[108px] w-[90px] shrink-0 object-contain drop-shadow-[0_6px_14px_rgba(184,107,38,0.28)]"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-cherry-deep">
            💚 Choix de l&apos;équipe
          </div>
          <div className="mt-0.5 font-display text-[22px] font-semibold leading-tight text-ink">
            La <span className="font-script text-cherry">Foli&apos;s</span>
          </div>
          <p className="mt-1 text-[12.5px] leading-snug text-ink-soft">
            Notre signature gourmande — gaufre, chantilly, cubes croustillants.
            Demandez la composition du jour.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-block rounded-full bg-ink px-3 py-1 text-[13px] font-bold text-cream">
              {item.price}
            </span>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="ml-auto text-ink/30"
              aria-hidden
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

/* ── Main export ────────────────────────────────────────── */
export function Menu() {
  const [active, setActive] = useState(categories[0].key);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const cat = categories.find((c) => c.key === active)!;
  const tabsRef = useRef<HTMLDivElement>(null);

  // La Foli's is the team-pick hero on the GLACES tab (the user's headline product),
  // and is hidden from the gaufres grid so it never appears twice.
  const isGaufres = cat.key === "gaufres";
  const isGlaces = cat.key === "glaces";
  const foli =
    categories.find((c) => c.key === "gaufres")?.items.find((i) => i.name === "La Foli's") ?? null;
  const teamPick: Item | null = isGlaces ? foli : null;
  const gridItems = isGaufres
    ? cat.items.filter((i) => i.name !== "La Foli's")
    : cat.items;

  function toggle(key: string) {
    setOpenKey((k) => (k === key ? null : key));
  }

  // Look up the open item across the whole catalog so the team-pick detail
  // (e.g. La Foli's shown on the glaces tab) resolves correctly.
  const openItem = openKey
    ? categories
        .flatMap((c) => c.items.map((i) => ({ key: `${c.key}:${i.name}`, item: i })))
        .find((x) => x.key === openKey)?.item ?? null
    : null;

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
            <span className="font-script text-teal-700">une caravane</span>
          </h2>
        </Reveal>
        <Reveal delay={0.07}>
          <p className="mt-2 text-center text-[13.5px] text-ink/50 sm:text-left">
            Touchez un article pour voir ingrédients, allergènes et calories
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

        {/* Tabs — sticky 2x2 grid on mobile, row on desktop. No horizontal scroll. */}
        <Reveal delay={0.11}>
          <div
            ref={tabsRef}
            className="sticky top-2 z-20 mt-8 grid grid-cols-2 gap-2 rounded-3xl bg-cream/85 p-2 shadow-soft ring-1 ring-ink/5 backdrop-blur sm:flex sm:flex-wrap sm:gap-3 sm:bg-transparent sm:p-0 sm:shadow-none sm:ring-0 sm:backdrop-blur-0"
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
                  onClick={() => {
                    setActive(c.key);
                    setOpenKey(null);
                  }}
                  className={`relative flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-2xl px-3 py-3 text-[15px] font-semibold transition active:scale-[0.98] sm:min-h-0 sm:px-5 ${
                    isActive ? `${c.bg} ${c.text} shadow-soft` : "bg-white/60 text-ink/55 hover:text-ink sm:bg-cream/60"
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

            {/* Team pick — La Foli's, displayed on the glaces tab */}
            {teamPick && (
              <div className="mt-6">
                <h3 className="mb-3 flex items-center gap-2 px-1 font-display text-[17px] font-semibold text-ink">
                  <span className="text-[20px]" aria-hidden>💚</span>
                  Choix de l&apos;équipe
                </h3>
                <FoliCard
                  item={teamPick}
                  isOpen={openKey === `gaufres:${teamPick.name}`}
                  onToggle={() => toggle(`gaufres:${teamPick.name}`)}
                />
                <h3 className="mt-6 mb-3 flex items-center gap-2 px-1 font-display text-[17px] font-semibold text-ink">
                  <span className="text-[20px]" aria-hidden>{cat.emoji}</span>
                  {cat.label}
                </h3>
              </div>
            )}

            {/* Grid of products */}
            <div className={`grid grid-cols-2 gap-3 ${teamPick ? "" : "mt-6"}`}>
              {gridItems.map((item) => {
                const key = `${cat.key}:${item.name}`;
                return (
                  <ProductCard
                    key={item.name}
                    item={item}
                    cat={cat}
                    isOpen={openKey === key}
                    onToggle={() => toggle(key)}
                    badge={item.star ? { label: "⭐ Le plus commandé", color: "cherry" } : undefined}
                  />
                );
              })}
            </div>

            {/* Inline detail panel for the open card */}
            <AnimatePresence>
              {openItem && (
                <motion.div
                  key={openKey}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 rounded-2xl bg-cream/70 px-4 py-3.5 text-[13px] shadow-soft ring-1 ring-ink/5 sm:px-5 sm:py-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h4 className="font-display text-[15px] font-semibold text-ink">
                        {openItem.name}
                      </h4>
                      <span className="flex items-center gap-1.5 rounded-full bg-ink/10 px-2.5 py-0.5 text-[11.5px] font-semibold text-ink">
                        <Flame className="h-3 w-3 text-cherry" />≈ {openItem.kcal} kcal
                      </span>
                    </div>
                    <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.15em] text-ink/40">
                      Ingrédients
                    </p>
                    <p className="mb-3 leading-relaxed text-ink/75">
                      {openItem.ingredients}.
                    </p>
                    {openItem.allergens.length > 0 ? (
                      <>
                        <p className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.15em] text-ink/40">
                          Allergènes
                        </p>
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {openItem.allergens.map((a) => <AllergenChip key={a} id={a} />)}
                        </div>
                      </>
                    ) : (
                      <div className="mb-3 flex items-center gap-1.5">
                        <Leaf className="h-3.5 w-3.5 text-teal-600" />
                        <span className="text-[12px] font-medium text-teal-700">Sans allergène majeur</span>
                      </div>
                    )}
                    {openItem.kcal > 500 && (
                      <p className="mb-2 text-[12px] font-medium text-orange-600">
                        ⚠️ À déguster avec modération
                      </p>
                    )}
                    <div className="flex gap-2 rounded-xl bg-cream p-3">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/40" />
                      <p className="text-[12.5px] leading-relaxed text-ink/70">{openItem.tip}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Suppléments block (attente.html style) */}
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-dashed border-cherry/35 bg-white shadow-soft">
            <div className="flex items-center gap-3 bg-gradient-to-br from-peach-100 to-sun-100 px-4 py-3 text-[13.5px] font-semibold text-ink sm:px-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/chantilly.png" alt="" className="h-6 w-6 shrink-0 object-contain" aria-hidden />
              <span>Chantilly <strong>+1&nbsp;€</strong></span>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-br from-cream-deep to-white px-4 py-3 text-[13.5px] font-semibold text-ink sm:px-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brochettes.png" alt="" className="h-6 w-9 shrink-0 object-contain" aria-hidden />
              <span>Brochette de bonbons <strong>2&nbsp;€</strong></span>
            </div>
          </div>
        </Reveal>

        {/* Footer note */}
        <Reveal delay={0.12}>
          <p className="mt-6 text-center text-[12.5px] text-ink/45">
            Carte indicative · prix susceptibles de varier · contamination croisée
            possible en cuisine — signalez vos allergies sévères · nos produits
            sont artisanaux, préparés sur place.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
