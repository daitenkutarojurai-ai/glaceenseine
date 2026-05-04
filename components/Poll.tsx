"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { BarChart2 } from "lucide-react";

type Choice = "crepe" | "glace" | "gaufre";
type Tallies = Record<Choice, number>;

const OPTIONS: { key: Choice; emoji: string; label: string; color: string; bar: string }[] = [
  { key: "crepe",  emoji: "🥞", label: "La crêpe",  color: "bg-sun-300",  bar: "bg-sun-300" },
  { key: "glace",  emoji: "🍦", label: "La glace",  color: "bg-rose-300", bar: "bg-rose-300" },
  { key: "gaufre", emoji: "🧇", label: "La gaufre", color: "bg-teal-300", bar: "bg-teal-300" },
];

// Seed tallies — feels lived-in from day one
const SEED: Tallies = { crepe: 47, glace: 83, gaufre: 31 };
const STORAGE_KEY = "ges_poll_v1";

function load(): { vote: Choice | null; tallies: Tallies } {
  if (typeof window === "undefined") return { vote: null, tallies: SEED };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { vote: null, tallies: SEED };
    return JSON.parse(raw);
  } catch {
    return { vote: null, tallies: SEED };
  }
}

function save(vote: Choice, tallies: Tallies) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ vote, tallies }));
}

export function Poll() {
  const [vote, setVote]     = useState<Choice | null>(null);
  const [tallies, setTallies] = useState<Tallies>(SEED);
  const [ready, setReady]   = useState(false);

  useEffect(() => {
    const { vote: v, tallies: t } = load();
    setVote(v);
    setTallies(t);
    setReady(true);
  }, []);

  function handleVote(choice: Choice) {
    if (vote) return;
    const next: Tallies = { ...tallies, [choice]: tallies[choice] + 1 };
    setVote(choice);
    setTallies(next);
    save(choice, next);
  }

  const total = Object.values(tallies).reduce((a, b) => a + b, 0);
  const pct   = (k: Choice) => Math.round((tallies[k] / total) * 100);

  return (
    <section
      id="sondage"
      className="relative scroll-mt-24 bg-ink py-20 text-cream sm:py-28"
      aria-labelledby="poll-title"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-cherry/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-teal-500/25 blur-3xl" />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow flex items-center justify-center gap-2 text-sun-300">
            <BarChart2 className="h-3.5 w-3.5" /> Sondage du quai
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="poll-title"
            className="h-display mt-2 text-center text-3xl text-cream sm:text-4xl"
          >
            Si vous deviez n'en choisir qu'un… 🤔
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-2 text-center text-[15px] text-cream/55">
            Répondez honnêtement. On ne juge pas.{" "}
            <span className="text-sun-300">Enfin, presque.</span>
          </p>
        </Reveal>

        <div className="mt-10 space-y-4">
          {OPTIONS.map((opt, i) => {
            const pctVal  = pct(opt.key);
            const isVoted = vote === opt.key;
            const hasVoted = Boolean(vote);

            return (
              <Reveal key={opt.key} delay={0.12 + i * 0.06}>
                <motion.button
                  onClick={() => handleVote(opt.key)}
                  disabled={hasVoted}
                  whileHover={!hasVoted ? { scale: 1.02 } : {}}
                  whileTap={!hasVoted ? { scale: 0.98 } : {}}
                  className={`relative w-full overflow-hidden rounded-2xl border transition ${
                    isVoted
                      ? "border-sun-300/50 ring-2 ring-sun-300/30"
                      : hasVoted
                      ? "border-white/10 opacity-60"
                      : "border-white/10 hover:border-white/25"
                  } bg-white/6 p-4`}
                  aria-pressed={isVoted}
                  aria-label={`Voter pour ${opt.label}`}
                >
                  {/* Progress bar fill */}
                  <AnimatePresence>
                    {hasVoted && ready && (
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: pctVal / 100 }}
                        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                        className={`absolute inset-y-0 left-0 origin-left ${opt.bar} opacity-20`}
                        style={{ width: "100%" }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-hidden>{opt.emoji}</span>
                      <span className="font-semibold text-cream">{opt.label}</span>
                      {isVoted && (
                        <span className="rounded-full bg-sun-300 px-2 py-0.5 text-[11px] font-bold text-ink">
                          Mon vote
                        </span>
                      )}
                    </div>
                    {hasVoted && ready && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[15px] font-bold text-cream/80"
                      >
                        {pctVal} %
                      </motion.span>
                    )}
                  </div>
                </motion.button>
              </Reveal>
            );
          })}
        </div>

        {/* Result comment after voting */}
        <AnimatePresence>
          {vote && ready && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center text-[15px] text-cream/85"
            >
              {vote === "glace" && "Bonne décision. La vanille de Madagascar vous attend ☀️"}
              {vote === "crepe" && "Vous avez goût. Beurre-sucre-citron, grand classique 🍋"}
              {vote === "gaufre" && "Courageux ! La folie chocolat vous tend les bras 🧇"}
            </motion.p>
          )}
        </AnimatePresence>

        {!vote && ready && (
          <Reveal delay={0.3}>
            <p className="mt-6 text-center text-[13px] text-cream/35">
              {total} personnes ont déjà voté
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
