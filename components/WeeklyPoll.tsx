"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

type Choice = { key: string; emoji: string; label: string; bar: string };
type Question = { text: string; sub: string; choices: Choice[] };

const QUESTIONS: Question[] = [
  {
    text: "Si vous deviez n'en choisir qu'un…",
    sub: "On ne juge pas. Enfin, presque.",
    choices: [
      { key: "crepe",  emoji: "🥞", label: "Crêpe",  bar: "bg-sun-400" },
      { key: "glace",  emoji: "🍦", label: "Glace",  bar: "bg-cherry" },
      { key: "gaufre", emoji: "🧇", label: "Gaufre", bar: "bg-teal-500" },
    ],
  },
  {
    text: "Quel parfum de glace pour ce dimanche ?",
    sub: "Votre estomac a déjà voté.",
    choices: [
      { key: "vanille",  emoji: "🍨", label: "Vanille de Madagascar",  bar: "bg-sun-400" },
      { key: "caramel",  emoji: "🍮", label: "Caramel beurre salé",    bar: "bg-amber-400" },
      { key: "pistache", emoji: "🌿", label: "Pistache de Bronte",     bar: "bg-green-400" },
      { key: "chocolat", emoji: "🍫", label: "Chocolat Valrhona",      bar: "bg-stone-500" },
    ],
  },
  {
    text: "Meilleur moment pour une gaufre ?",
    sub: "Scientifiquement parlant, bien sûr.",
    choices: [
      { key: "aprem",  emoji: "☀️", label: "14h — la faim du dimanche",  bar: "bg-sun-400" },
      { key: "gouter", emoji: "🕓", label: "16h30 — goûter d'enfants",   bar: "bg-cherry" },
      { key: "sunset", emoji: "🌅", label: "18h — en regardant la Seine", bar: "bg-teal-400" },
    ],
  },
  {
    text: "Quelle garniture pour votre crêpe idéale ?",
    sub: "Débat fondateur de la civilisation.",
    choices: [
      { key: "beurre",  emoji: "🧈", label: "Beurre · sucre · citron", bar: "bg-sun-400" },
      { key: "nutella", emoji: "🍫", label: "Nutella (classique)",      bar: "bg-amber-500" },
      { key: "caramel", emoji: "🍮", label: "Caramel beurre salé",      bar: "bg-orange-400" },
      { key: "banane",  emoji: "🍌", label: "Banane · chocolat",        bar: "bg-yellow-400" },
    ],
  },
  {
    text: "La Seine vous inspire quel parfum inédit ?",
    sub: "On note tout pour la prochaine saison.",
    choices: [
      { key: "menthe",  emoji: "🌿", label: "Menthe fraîche du jardin", bar: "bg-teal-400" },
      { key: "lavande", emoji: "💜", label: "Lavande de Provence",      bar: "bg-purple-400" },
      { key: "rose",    emoji: "🌹", label: "Rose & framboise",         bar: "bg-rose-400" },
      { key: "miel",    emoji: "🍯", label: "Miel de Seine-et-Marne",   bar: "bg-amber-400" },
    ],
  },
  {
    text: "Après une promenade, qu'est-ce qui manque ?",
    sub: "On cherche à vous surprendre.",
    choices: [
      { key: "coupe",  emoji: "🏆", label: "Une coupe 3 boules",      bar: "bg-cherry" },
      { key: "crepe2", emoji: "🥞", label: "Une crêpe party partagée", bar: "bg-sun-400" },
      { key: "drink",  emoji: "🥤", label: "Une limonade artisanale",  bar: "bg-teal-400" },
    ],
  },
  {
    text: "Quel animal serait notre glace préférée ?",
    sub: "Question philosophique du mardi.",
    choices: [
      { key: "cat", emoji: "🐱", label: "Chat — douce (vanille)",    bar: "bg-sun-400" },
      { key: "bear",emoji: "🐻", label: "Ours — intense (chocolat)", bar: "bg-stone-500" },
      { key: "fox", emoji: "🦊", label: "Renard — malin (caramel)",  bar: "bg-orange-400" },
      { key: "bee", emoji: "🐝", label: "Abeille — piquante (citron)",bar: "bg-yellow-400" },
    ],
  },
  {
    text: "La meilleure chose à faire sur la Seine ?",
    sub: "Hormis manger une glace, évidemment.",
    choices: [
      { key: "bateau", emoji: "⛵", label: "Regarder les bateaux",     bar: "bg-teal-400" },
      { key: "velo",   emoji: "🚴", label: "Aller à vélo sur les quais",bar: "bg-green-400" },
      { key: "peche",  emoji: "🎣", label: "Pêcher le dimanche matin", bar: "bg-blue-400" },
      { key: "pique",  emoji: "🧺", label: "Pique-niquer en famille",  bar: "bg-cherry" },
    ],
  },
  {
    text: "Votre combo parfait par temps chaud ?",
    sub: "Étude scientifique exclusive de la caravane.",
    choices: [
      { key: "sorbet_limo",  emoji: "🍋", label: "Sorbet citron + limonade",       bar: "bg-teal-400" },
      { key: "glace_cafe",   emoji: "☕", label: "Glace vanille + café",            bar: "bg-sun-400" },
      { key: "crepe_juice",  emoji: "🥞", label: "Crêpe sucre + jus de pomme",     bar: "bg-amber-400" },
      { key: "gaufre_choco", emoji: "🧇", label: "Gaufre Nutella + chocolat chaud", bar: "bg-cherry" },
    ],
  },
  {
    text: "Si la caravane était un film ?",
    sub: "La séance est à 14h.",
    choices: [
      { key: "amelie",      emoji: "🎬", label: "Amélie Poulain",          bar: "bg-cherry" },
      { key: "chocolat",    emoji: "🍫", label: "Le Chocolat",             bar: "bg-stone-500" },
      { key: "ratatouille", emoji: "🐭", label: "Ratatouille",             bar: "bg-teal-400" },
      { key: "bronzes",     emoji: "🌻", label: "Les Bronzés font du ski", bar: "bg-sun-400" },
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
  const weekIdx    = getWeekNumber() % QUESTIONS.length;
  const storageKey = `${STORAGE_PREFIX}${getWeekNumber()}`;
  const question   = QUESTIONS[weekIdx];

  type Tallies = Record<string, number>;
  const SEED: Tallies = Object.fromEntries(question.choices.map((c, i) => [c.key, 30 + i * 17]));

  const [vote,    setVote]    = useState<string | null>(null);
  const [tallies, setTallies] = useState<Tallies>(SEED);
  const [ready,   setReady]   = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
      if (saved) { setVote(saved.vote); setTallies(saved.tallies); }
    } catch { /* ignore */ }
    setReady(true);
  }, [storageKey]);

  function pick(key: string) {
    if (vote) return;
    const next = { ...tallies, [key]: (tallies[key] ?? 0) + 1 };
    setVote(key); setTallies(next);
    if (typeof window !== "undefined")
      localStorage.setItem(storageKey, JSON.stringify({ vote: key, tallies: next }));
  }

  const total = Object.values(tallies).reduce((a, b) => a + b, 0);
  const pct   = (k: string) => Math.round(((tallies[k] ?? 0) / total) * 100);

  return { question, weekNumber: getWeekNumber(), vote, tallies, ready, pick, total, pct };
}

/* ── Compact card — used inside Gallery grid ── */
export function WeeklyPollCard() {
  const { question, weekNumber, vote, ready, pick, total, pct } = usePoll();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-ink p-4 shadow-ring sm:rounded-3xl sm:p-5">
      {/* Header */}
      <div className="flex items-start gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-sun-300 text-ink">
          <BarChart2 className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-sun-300">
            Sondage · sem. {weekNumber}
          </p>
          <p className="mt-0.5 font-display text-[13px] font-medium leading-snug text-cream sm:text-[14px]">
            {question.text}
          </p>
          <p className="mt-0.5 text-[10px] text-cream/40 hidden sm:block">{question.sub}</p>
        </div>
      </div>

      {/* Choices */}
      <div className="mt-3 flex-1 space-y-1.5 overflow-y-auto">
        {question.choices.map((opt) => {
          const pv      = pct(opt.key);
          const isVoted = vote === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => pick(opt.key)}
              disabled={!!vote}
              className={`relative w-full overflow-hidden rounded-lg border px-2.5 py-2 text-left transition ${
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
              <div className="relative flex items-center justify-between gap-1">
                <span className="flex items-center gap-1.5 text-[12px] font-medium text-cream">
                  <span className="text-[13px]">{opt.emoji}</span>
                  <span className="truncate">{opt.label}</span>
                  {isVoted && (
                    <span className="shrink-0 rounded-full bg-sun-300 px-1.5 py-0.5 text-[9px] font-bold text-ink">✓</span>
                  )}
                </span>
                {vote && ready && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="shrink-0 text-[11px] font-bold text-cream/70"
                  >
                    {pv}%
                  </motion.span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-2.5 flex items-center justify-between">
        <p className="text-[10px] text-cream/30">{total} votes</p>
        <span className="flex items-center gap-1 text-[10px] text-sun-300/60">
          <Sparkles className="h-2.5 w-2.5" />Chaque semaine
        </span>
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
