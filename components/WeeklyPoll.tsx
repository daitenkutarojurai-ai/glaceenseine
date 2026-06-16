"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

type Choice = { key: string; emoji: string; label: string; bar: string };
type Question = { text: string; sub: string; choices: Choice[] };

const QUESTIONS: Question[] = [
  {
    text: "Ce qu'on aime le plus à La Frette ?",
    sub: "Plusieurs bonnes réponses, on sait",
    choices: [
      { key: "quais",   emoji: "🌊", label: "Les quais de Seine",        bar: "bg-teal-400" },
      { key: "marche",  emoji: "🥖", label: "Le marché du dimanche",      bar: "bg-sun-400" },
      { key: "village", emoji: "🏘️", label: "L'esprit village",            bar: "bg-cherry" },
      { key: "calme",   emoji: "🌿", label: "Le calme à 20 min de Paris", bar: "bg-green-400" },
    ],
  },
  {
    text: "Le meilleur endroit pour une pause sur le quai ?",
    sub: "On vous lit, on note",
    choices: [
      { key: "mairie",  emoji: "🏛️", label: "Devant la mairie",            bar: "bg-cherry" },
      { key: "berge",   emoji: "🌳", label: "Sous les arbres de la berge", bar: "bg-green-400" },
      { key: "ponton",  emoji: "⛵", label: "Près du ponton",               bar: "bg-teal-400" },
      { key: "passage", emoji: "🚶", label: "Au passage à niveau",          bar: "bg-sun-400" },
    ],
  },
  {
    text: "La balade idéale à La Frette ?",
    sub: "Avec ou sans glace, à vous de voir",
    choices: [
      { key: "quaiseine", emoji: "🌊", label: "Le long de la Seine",          bar: "bg-teal-400" },
      { key: "herblay",   emoji: "🚶", label: "Jusqu'à Herblay",              bar: "bg-green-400" },
      { key: "cormeilles",emoji: "🚶", label: "Direction Cormeilles",         bar: "bg-sun-400" },
      { key: "ile",       emoji: "🏝️", label: "Vers l'île de la Dérivation",   bar: "bg-cherry" },
    ],
  },
  {
    text: "La saison préférée à La Frette ?",
    sub: "Toute l'année, mais quand même",
    choices: [
      { key: "printemps", emoji: "🌸", label: "Le printemps en fleurs",     bar: "bg-rose-400" },
      { key: "ete",       emoji: "☀️", label: "L'été au bord de l'eau",     bar: "bg-sun-400" },
      { key: "automne",   emoji: "🍂", label: "L'automne doré sur la Seine", bar: "bg-amber-400" },
      { key: "hiver",     emoji: "❄️", label: "L'hiver tranquille",          bar: "bg-blue-400" },
    ],
  },
  {
    text: "Le meilleur moment pour passer au food truck ?",
    sub: "On est là sam · dim · fériés, 15h–18h",
    choices: [
      { key: "debut",   emoji: "☀️", label: "15h · début de l'après-midi", bar: "bg-sun-400" },
      { key: "gouter",  emoji: "🕓", label: "16h · l'heure du goûter",     bar: "bg-cherry" },
      { key: "fin",     emoji: "🌅", label: "18h · coucher de soleil",     bar: "bg-teal-400" },
    ],
  },
  {
    text: "Avec qui aimez-vous venir au quai ?",
    sub: "On vous reconnaît tous",
    choices: [
      { key: "famille", emoji: "👨‍👩‍👧", label: "En famille",          bar: "bg-cherry" },
      { key: "amis",    emoji: "👯", label: "Entre amis",            bar: "bg-sun-400" },
      { key: "couple",  emoji: "💞", label: "En amoureux",            bar: "bg-rose-400" },
      { key: "solo",    emoji: "📖", label: "Seul·e, pour souffler",   bar: "bg-teal-400" },
    ],
  },
  {
    text: "Votre combo Glaces en Seine préféré ?",
    sub: "On retient les votes",
    choices: [
      { key: "crepe_glace",  emoji: "🥞", label: "Une crêpe + une boule",    bar: "bg-sun-400" },
      { key: "gaufre_choco", emoji: "🧇", label: "Une gaufre pâte à tartiner", bar: "bg-amber-500" },
      { key: "trois_boules", emoji: "🍦", label: "Trois boules à partager",   bar: "bg-cherry" },
      { key: "folis",        emoji: "✨", label: "La Foli's",                  bar: "bg-teal-400" },
    ],
  },
  {
    text: "La plus belle vue de La Frette ?",
    sub: "Question difficile, on l'avoue",
    choices: [
      { key: "pont",    emoji: "🌉", label: "Le pont vu depuis le quai", bar: "bg-teal-400" },
      { key: "berge",   emoji: "🌊", label: "La Seine au coucher du soleil", bar: "bg-cherry" },
      { key: "mairie",  emoji: "🏛️", label: "La place de la mairie",     bar: "bg-sun-400" },
      { key: "iles",    emoji: "🏝️", label: "Les îles en face",           bar: "bg-green-400" },
    ],
  },
  {
    text: "Ce qui rend un dimanche parfait à La Frette ?",
    sub: "On peut deviner, mais on préfère vous lire",
    choices: [
      { key: "soleil",  emoji: "☀️", label: "Du soleil sur le quai",       bar: "bg-sun-400" },
      { key: "marche",  emoji: "🥐", label: "Le marché et un café",        bar: "bg-amber-400" },
      { key: "balade",  emoji: "🚶", label: "Une balade en bord de Seine", bar: "bg-teal-400" },
      { key: "glace",   emoji: "🍦", label: "Une glace partagée",          bar: "bg-cherry" },
    ],
  },
  {
    text: "Le petit plaisir frettois ?",
    sub: "Celui qu'on garde pour soi",
    choices: [
      { key: "boulang", emoji: "🥖", label: "La baguette du boulanger",   bar: "bg-sun-400" },
      { key: "terrasse",emoji: "☕", label: "Un café en terrasse",        bar: "bg-amber-400" },
      { key: "voisin",  emoji: "👋", label: "Croiser un voisin sur le quai", bar: "bg-cherry" },
      { key: "silence", emoji: "🌿", label: "Le silence du matin",        bar: "bg-green-400" },
    ],
  },
];

function getWeekNumber(): number {
  const d = new Date();
  const oneJan = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7);
}

const STORAGE_PREFIX = "ges_poll_w";

/* ── Shared poll logic ── */
function usePoll() {
  // Compute week index on the client only — using new Date() at render
  // time causes hydration mismatches around day/week boundaries.
  const [weekNumber, setWeekNumber] = useState<number | null>(null);
  const weekIdx    = ((weekNumber ?? 0) % QUESTIONS.length + QUESTIONS.length) % QUESTIONS.length;
  const storageKey = `${STORAGE_PREFIX}${weekNumber ?? 0}`;
  const question   = QUESTIONS[weekIdx];

  type Tallies = Record<string, number>;
  const SEED: Tallies = Object.fromEntries(question.choices.map((c, i) => [c.key, 30 + i * 17]));

  const [vote,    setVote]    = useState<string | null>(null);
  const [tallies, setTallies] = useState<Tallies>(SEED);
  const [ready,   setReady]   = useState(false);

  useEffect(() => {
    const wn = getWeekNumber();
    setWeekNumber(wn);
    const key = `${STORAGE_PREFIX}${wn}`;
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? "null");
      if (saved) { setVote(saved.vote); setTallies(saved.tallies); }
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  function pick(key: string) {
    if (vote) return;
    const next = { ...tallies, [key]: (tallies[key] ?? 0) + 1 };
    setVote(key); setTallies(next);
    if (typeof window !== "undefined")
      localStorage.setItem(storageKey, JSON.stringify({ vote: key, tallies: next }));
  }

  const total = Object.values(tallies).reduce((a, b) => a + b, 0);
  const pct   = (k: string) => Math.round(((tallies[k] ?? 0) / total) * 100);

  return { question, weekNumber: weekNumber ?? 0, vote, tallies, ready, pick, total, pct };
}

/* ── Compact strip — discreet horizontal band below gallery ── */
export function WeeklyPollCard() {
  const { question, weekNumber, vote, ready, pick, total, pct } = usePoll();

  return (
    <div className="overflow-hidden rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3.5 shadow-soft sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        {/* Label + question */}
        <div className="flex shrink-0 items-center gap-2.5 sm:w-60">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal-500 text-cream shadow-sm">
            <BarChart2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-teal-600">
              Sondage · sem. {weekNumber}
            </p>
            <p className="font-display text-[13px] font-semibold leading-snug text-ink">
              {question.text}
            </p>
          </div>
        </div>

        {/* Choices — horizontal pills */}
        <div className="flex flex-wrap gap-2">
          {question.choices.map((opt) => {
            const pv      = pct(opt.key);
            const isVoted = vote === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => pick(opt.key)}
                disabled={!!vote}
                className={`relative overflow-hidden rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition ${
                  isVoted
                    ? "border-teal-500 bg-teal-500 text-cream font-semibold shadow-sm"
                    : vote
                    ? "cursor-default border-teal-200/60 bg-white/50 text-ink/35"
                    : "cursor-pointer border-teal-300 bg-white text-ink hover:border-teal-500 hover:bg-teal-100"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>{opt.emoji}</span>
                  <span>{opt.label}</span>
                  {vote && ready && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[11px] font-bold opacity-70"
                    >
                      {pv}%
                    </motion.span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Total */}
        <p className="shrink-0 text-[11px] font-medium text-teal-600/70 sm:ml-auto">{total} votes</p>
      </div>
    </div>
  );
}

/* ── Full section — standalone use ── */
export function WeeklyPoll() {
  const { question, weekNumber, vote, ready, pick, total, pct } = usePoll();

  return (
    <section className="py-10 sm:py-14" aria-labelledby="poll-title">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-ink px-6 py-7 shadow-ring sm:px-8 sm:py-8">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-sun-300 text-ink shadow-glow-sun">
                <BarChart2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-sun-300">
                  Sondage du quai · semaine {weekNumber}
                </p>
                <h2 id="poll-title" className="mt-1 font-display text-[17px] font-medium leading-snug text-cream sm:text-[18px]">
                  {question.text}
                </h2>
                <p className="mt-0.5 text-[12px] text-cream/40">{question.sub}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {question.choices.map((opt) => {
                const pv      = pct(opt.key);
                const isVoted = vote === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => pick(opt.key)}
                    disabled={!!vote}
                    className={`relative w-full overflow-hidden rounded-xl border px-3 py-2.5 text-left transition sm:px-4 ${
                      isVoted
                        ? "border-sun-300/60 ring-1 ring-sun-300/30"
                        : vote
                        ? "cursor-default border-white/8 opacity-55"
                        : "cursor-pointer border-white/10 hover:border-white/30"
                    } bg-white/5`}
                  >
                    <AnimatePresence>
                      {vote && ready && (
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: pv / 100 }}
                          transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
                          className={`absolute inset-y-0 left-0 origin-left opacity-20 ${opt.bar}`}
                          style={{ width: "100%" }}
                        />
                      )}
                    </AnimatePresence>
                    <div className="relative flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-[13.5px] font-medium text-cream">
                        <span>{opt.emoji}</span>
                        {opt.label}
                        {isVoted && (
                          <span className="rounded-full bg-sun-300 px-1.5 py-0.5 text-[10px] font-bold text-ink">Mon vote</span>
                        )}
                      </span>
                      {vote && ready && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[12.5px] font-bold text-cream/70">
                          {pv} %
                        </motion.span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-[11px] text-cream/30">{total} votes · résultats en direct</p>
              <span className="flex items-center gap-1 text-[11px] text-sun-300/70">
                <Sparkles className="h-3 w-3" />Nouvelle question chaque semaine
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
