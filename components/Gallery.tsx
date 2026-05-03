"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BarChart2 } from "lucide-react";
import { Reveal } from "./Reveal";

/* ── Mini inline Poll ─────────────────────────────────── */
type Choice = "crepe" | "glace" | "gaufre";
type Tallies = Record<Choice, number>;
const OPTIONS: { key: Choice; emoji: string; label: string; bar: string }[] = [
  { key: "crepe",  emoji: "🥞", label: "Crêpe",  bar: "bg-sun-400" },
  { key: "glace",  emoji: "🍦", label: "Glace",  bar: "bg-cherry" },
  { key: "gaufre", emoji: "🧇", label: "Gaufre", bar: "bg-teal-500" },
];
const SEED: Tallies = { crepe: 47, glace: 83, gaufre: 31 };
const STORAGE_KEY = "ges_poll_v1";
function loadPoll(): { vote: Choice | null; tallies: Tallies } {
  if (typeof window === "undefined") return { vote: null, tallies: SEED };
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") ?? { vote: null, tallies: SEED }; }
  catch { return { vote: null, tallies: SEED }; }
}
function savePoll(vote: Choice, tallies: Tallies) {
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify({ vote, tallies }));
}

function MiniPoll() {
  const [vote,    setVote]    = useState<Choice | null>(null);
  const [tallies, setTallies] = useState<Tallies>(SEED);
  const [ready,   setReady]   = useState(false);

  useEffect(() => {
    const { vote: v, tallies: t } = loadPoll();
    setVote(v); setTallies(t); setReady(true);
  }, []);

  function pick(c: Choice) {
    if (vote) return;
    const next = { ...tallies, [c]: tallies[c] + 1 };
    setVote(c); setTallies(next); savePoll(c, next);
  }

  const total = Object.values(tallies).reduce((a, b) => a + b, 0);
  const pct   = (k: Choice) => Math.round((tallies[k] / total) * 100);

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl bg-ink p-5 text-cream shadow-ring sm:p-6">
      <div>
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-sun-300">
          <BarChart2 className="h-3.5 w-3.5" />Sondage du quai
        </p>
        <p className="mt-2 font-display text-[16px] font-medium leading-snug text-cream sm:text-[17px]">
          Si vous deviez n&apos;en choisir qu&apos;un…
        </p>
        <p className="mt-1 text-[12px] text-cream/45">On ne juge pas. Enfin, presque.</p>
      </div>

      <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
        {OPTIONS.map((opt) => {
          const pv      = pct(opt.key);
          const isVoted = vote === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => pick(opt.key)}
              disabled={!!vote}
              className={`relative w-full overflow-hidden rounded-xl border px-3 py-2 text-left transition sm:px-4 sm:py-2.5 ${
                isVoted
                  ? "border-sun-300/60 ring-1 ring-sun-300/30"
                  : vote
                  ? "border-white/8 opacity-55"
                  : "border-white/10 hover:border-white/25 cursor-pointer"
              } bg-white/5`}
            >
              <AnimatePresence>
                {vote && ready && (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: pv / 100 }}
                    transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
                    className={`absolute inset-y-0 left-0 origin-left ${opt.bar} opacity-20`}
                    style={{ width: "100%" }}
                  />
                )}
              </AnimatePresence>
              <div className="relative flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[13.5px] font-medium text-cream sm:text-[14px]">
                  <span>{opt.emoji}</span>
                  {opt.label}
                  {isVoted && (
                    <span className="rounded-full bg-sun-300 px-1.5 py-0.5 text-[10px] font-bold text-ink">
                      Mon vote
                    </span>
                  )}
                </span>
                {vote && ready && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-[12.5px] font-bold text-cream/70 sm:text-[13px]">{pv} %
                  </motion.span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] text-cream/30 sm:mt-4">{total} votes · résultats en temps réel</p>
    </div>
  );
}

/* ── Photos ──────────────────────────────────────────── */
const PHOTOS = [
  {
    src: "/inprod.jpg",
    alt: "Préparation des crêpes au billig",
    caption: "Le billig en plein service",
  },
  {
    src: "/camion-patronne.jpg",
    alt: "La caravane et ses fondatrices",
    caption: "La caravane, sous les tilleuls",
  },
];

export function Gallery() {
  return (
    <section
      id="galerie"
      className="scroll-mt-20 py-10 sm:py-16"
      aria-labelledby="gallery-title"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Sur les quais</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="gallery-title"
            className="h-display mt-1 text-2xl sm:text-3xl"
          >
            Une halte{" "}
            <span className="font-script text-cherry">douce</span>{" "}
            au bord de la Seine.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ink/55">
            On installe quelques tables sur l&apos;herbe, les enfants courent
            jusqu&apos;au ponton, les amoureux partagent un cornet à deux.
            La caravane sent bon le sucre chaud et la crème vanille.
          </p>
        </Reveal>

        {/* 2 photos + poll — equal-weight 3-column row, single 1-column stack on mobile */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-3">
          {PHOTOS.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-deep shadow-soft sm:aspect-square"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-4 right-4 text-[12px] font-medium text-cream/90 drop-shadow-sm">
                {p.caption}
              </p>
            </motion.div>
          ))}

          {/* Poll — same column width, fixed height on mobile, square on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="min-h-[280px] sm:aspect-square sm:min-h-0"
          >
            <div className="h-full">
              <MiniPoll />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
