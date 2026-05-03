"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { IceCream, Cookie, CakeSlice, Star, ChevronDown, Flame, Leaf, Info } from "lucide-react";

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
    tagline: "Boules onctueuses — parfums de saison",
    icon: IceCream,
    bg: "bg-rose-100",
    accent: "bg-rose-300/30",
    text: "text-cherry",
    items: [
      {
        name: "Vanille de Madagascar",
        desc: "Crème entière, gousse infusée 24 h",
        price: "3 €",
        star: true,
        ingredients: "Crème entière (35 %), lait entier, jaunes d'œufs, sucre, gousse de vanille de Madagascar",
        allergens: ["lait", "oeufs"],
        kcal: 195,
        tip: "La vanille Bourbon de Madagascar est l'une des plus aromatiques — l'infusion 24 h à froid préserve les aldéhydes vanilliques qui disparaissent à chaud.",
      },
      {
        name: "Fraise du Vexin",
        desc: "Fruits frais, sirop léger",
        price: "3,50 €",
        ingredients: "Fraises du Vexin (75 %), sucre, jus de citron",
        allergens: [],
        kcal: 88,
        tip: "Sorbet sans produit laitier. Les fraises du Vexin bénéficient d'une indication géographique protégée (IGP) — sol limoneux qui leur donne leur acidité caractéristique.",
      },
      {
        name: "Pistache",
        desc: "Pâte de pistache de Bronte",
        price: "3,50 €",
        ingredients: "Crème entière, lait entier, jaunes d'œufs, sucre, pâte de pistache de Bronte (IGP, Sicile)",
        allergens: ["lait", "oeufs", "pistache"],
        kcal: 220,
        tip: "La pistache de Bronte (IGP sicilienne) représente moins de 1 % de la production mondiale — sa couleur vert émeraude vient de sa teneur exceptionnelle en chlorophylle.",
      },
      {
        name: "Caramel beurre salé",
        desc: "Beurre de baratte, fleur de sel",
        price: "3,50 €",
        star: true,
        ingredients: "Crème entière, lait entier, sucre, beurre de baratte (AOP Charentes-Poitou), fleur de sel de Guérande, jaunes d'œufs",
        allergens: ["lait", "oeufs"],
        kcal: 235,
        tip: "La fleur de sel de Guérande est récoltée à la main avec une loue (râteau en bois). Son croquant léger crée le contraste sucré-salé qui active les récepteurs gustatifs.",
      },
      {
        name: "Chocolat noir 70 %",
        desc: "Cacao Valrhona",
        price: "3 €",
        ingredients: "Crème entière, lait entier, jaunes d'œufs, chocolat noir Valrhona 70 % (cacao, sucre, beurre de cacao, lécithine de soja), sucre",
        allergens: ["lait", "oeufs", "soja"],
        kcal: 210,
        tip: "Le cacao Valrhona est sourcé en direct auprès de coopératives (programme Ensemble). 70 % de cacao = 3× plus d'antioxydants flavonoïdes que le chocolat au lait.",
      },
      {
        name: "Sorbet citron",
        desc: "Pressé minute, zeste râpé",
        price: "3 €",
        ingredients: "Jus de citron pressé (40 %), zeste de citron, eau, sucre",
        allergens: [],
        kcal: 78,
        tip: "Pressé et zesté à la commande. Une boule couvre 35 % des apports journaliers recommandés en vitamine C. Sans produit laitier ni œuf — idéal pour les intolérances.",
      },
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
      {
        name: "Beurre · sucre · citron",
        desc: "Le grand classique breton",
        price: "3 €",
        star: true,
        ingredients: "Farine de blé T45, œufs, lait entier, beurre demi-sel AOP, sucre cristal, jus de citron",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 275,
        tip: "La recette bretonne authentique utilise du sucre cristal — jamais du sucre glace. Le cristal tient sous le beurre chaud et crée de petits points caramélisés.",
      },
      {
        name: "Nutella",
        desc: "Une cuillère généreuse",
        price: "3,50 €",
        ingredients: "Farine de blé, œufs, lait, beurre, Nutella (sucre, huile de palme, noisettes 13 %, cacao maigre, lait écrémé en poudre, lactosérum, lécithine de soja, vanilline)",
        allergens: ["gluten", "oeufs", "lait", "noisettes", "soja"],
        kcal: 485,
        tip: "Le Nutella se travaille idéalement à 28 °C — trop froid, il déchire la crêpe ; trop chaud, il se sépare. On l'étale après cuisson pour garder sa texture.",
      },
      {
        name: "Caramel beurre salé",
        desc: "Notre caramel maison",
        price: "3,50 €",
        star: true,
        ingredients: "Farine de blé, œufs, lait, beurre, caramel maison : sucre, beurre de baratte, crème liquide, fleur de sel",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 380,
        tip: "Notre caramel est cuit à 170 °C (stade caramel ambré) — c'est la réaction de Maillard et la caramélisation qui développent les 300+ composés aromatiques du caramel.",
      },
      {
        name: "Confiture maison",
        desc: "Fraise, abricot ou châtaigne",
        price: "3 €",
        ingredients: "Farine de blé, œufs, lait, beurre, confiture artisanale (fruit, sucre) — sans pectine ajoutée pour fraise et abricot",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 295,
        tip: "Confitures cuites en petits lots (500 g max) à 65° Brix — ce taux de sucre assure la conservation naturelle sans conservateur. La châtaigne est une spécialité d'automne.",
      },
      {
        name: "Banane · chocolat",
        desc: "Banane fraîche, ganache tiède",
        price: "4 €",
        ingredients: "Farine de blé, œufs, lait, beurre, banane fraîche, ganache : chocolat noir, crème entière, sucre",
        allergens: ["gluten", "oeufs", "lait", "soja"],
        kcal: 455,
        tip: "La banane est coupée à la commande pour éviter l'oxydation. Elle apporte du potassium et du tryptophane — précurseur de la sérotonine. Bonne humeur garantie.",
      },
      {
        name: "Sucre",
        desc: "Cassonade ou cristal",
        price: "2,50 €",
        ingredients: "Farine de blé T45, œufs, lait entier, beurre, cassonade ou sucre cristal",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 215,
        tip: "La cassonade est du sucre de canne dont la mélasse n'a pas été totalement retirée — elle apporte des notes légèrement torréfiées absentes du sucre blanc raffiné.",
      },
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
      {
        name: "Folie chocolat",
        desc: "Boule de glace, sauce chaude, chantilly",
        price: "6 €",
        star: true,
        ingredients: "Farine de blé, œufs, lait, beurre, sucre, levure chimique, boule de glace vanille (crème, lait, œufs, vanille), sauce chocolat (chocolat Valrhona, crème), chantilly maison",
        allergens: ["gluten", "oeufs", "lait", "soja"],
        kcal: 610,
        tip: "Servir immédiatement : la sauce chocolat est versée à 65 °C, ce qui crée une zone fondue à la surface de la glace — le contraste chaud/froid est un plaisir gustatif reconnu par la psychophysique alimentaire.",
      },
      {
        name: "Fraises · chantilly",
        desc: "Fraises fraîches, crème montée minute",
        price: "5 €",
        star: true,
        ingredients: "Farine de blé, œufs, lait, beurre, sucre, levure chimique, fraises fraîches, chantilly : crème 35 %, sucre glace, vanille",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 420,
        tip: "Les fraises sont coupées à la dernière minute — elles s'oxydent et libèrent leur jus en 5 min. La crème est montée à froid (+ 4 °C) pour une tenue de 30 min minimum.",
      },
      {
        name: "Caramel · noisettes",
        desc: "Caramel maison, noisettes torréfiées",
        price: "4,50 €",
        ingredients: "Farine de blé, œufs, lait, beurre, sucre, levure chimique, caramel maison (sucre, beurre, crème, fleur de sel), noisettes torréfiées",
        allergens: ["gluten", "oeufs", "lait", "noisettes"],
        kcal: 480,
        tip: "Les noisettes sont torréfiées 12 min à 170 °C. La réaction de Maillard entre les sucres et les protéines développe 50+ composés aromatiques dont la pyrazine (goût noisette-torréfié).",
      },
      {
        name: "Nutella",
        desc: "Coulant, généreux",
        price: "4 €",
        ingredients: "Farine de blé, œufs, lait, beurre, sucre, levure chimique, Nutella (sucre, huile de palme, noisettes 13 %, cacao, lait écrémé, lactosérum, lécithine de soja)",
        allergens: ["gluten", "oeufs", "lait", "noisettes", "soja"],
        kcal: 505,
        tip: "Conseil : demandez-le «demi-refroidi» — on sort la gaufre 2 min avant de l'étaler, le Nutella reste coulant sans absorber dans la pâte. Texture optimale garantie.",
      },
      {
        name: "Chantilly maison",
        desc: "Crème montée minute",
        price: "4 €",
        ingredients: "Farine de blé, œufs, lait, beurre, sucre, levure chimique, chantilly maison : crème entière 35 %, sucre glace, extrait de vanille",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 360,
        tip: "Montée à la main à la dernière minute — jamais en bombe (N₂O). La crème entière 35 % forme des cristaux de matière grasse stables qui tiennent sans s'effondrer.",
      },
      {
        name: "Sucre glace",
        desc: "Toute simple",
        price: "3 €",
        ingredients: "Farine de blé, œufs, lait, beurre, sucre, levure chimique, sucre glace (sucre, amidon de maïs)",
        allergens: ["gluten", "oeufs", "lait"],
        kcal: 280,
        tip: "L'amidon de maïs dans le sucre glace (3 %) absorbe l'humidité de la gaufre et crée une fine couche craquante. Simple et parfait pour apprécier la pâte nature.",
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
          <div className="mt-3 flex items-center gap-2">
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
          <div className="flex items-center gap-2">
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
          <p className="eyebrow text-center sm:text-left">La carte</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="menu-title" className="h-display mt-2 text-center text-3xl sm:text-left sm:text-5xl">
            Trois envies,{" "}
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
            <div className="mt-4 overflow-hidden rounded-3xl bg-cream shadow-soft">
              {rest.map((item, i) => (
                <MenuItem key={item.name} item={item} cat={cat} isLast={i === rest.length - 1} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-[13px] text-ink/45">
            Carte indicative · parfums selon arrivages · prix susceptibles de varier ·
            contamination croisée possible en cuisine — signalez vos allergies sévères.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
