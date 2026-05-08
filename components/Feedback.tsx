"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Check, Heart, ExternalLink, X } from "lucide-react";
import { Reveal } from "./Reveal";

const GOOGLE_REVIEW_URL = "https://g.page/r/CcKQvU-g5mpzEBM/review";

type EmojiKey = "love" | "good" | "meh" | "bad";
const EMOJIS: { key: EmojiKey; icon: string; label: string }[] = [
  { key: "love", icon: "😍", label: "Coup de cœur" },
  { key: "good", icon: "😊", label: "Bien" },
  { key: "meh",  icon: "😐", label: "Moyen" },
  { key: "bad",  icon: "😕", label: "Décevant" },
];

const RATING_LABELS = ["", "Hm… pas top", "Peut mieux faire", "Pas mal !", "Très bien !", "On est aux anges ! 🎉"];

type Status = "idle" | "loading" | "ok" | "error";

export function Feedback() {
  const [rating,          setRating]          = useState(0);
  const [hovered,         setHovered]         = useState(0);
  const [emoji,           setEmoji]           = useState<EmojiKey | null>(null);
  const [comment,         setComment]         = useState("");
  const [status,          setStatus]          = useState<Status>("idle");
  const [errorMsg,        setError]           = useState("");
  const [submittedRating, setSubmittedRating] = useState(0);
  const [googlePopup,     setGooglePopup]     = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (rating === 0) { setError("Choisissez une note en étoiles."); return; }
    setStatus("loading");
    setError("");

    const captured = rating;
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ rating: captured, emoji, comment }),
      });
      if (!res.ok) throw new Error();
      setSubmittedRating(captured);
      setStatus("ok");
      if (captured >= 4) {
        setTimeout(() => setGooglePopup(true), 1600);
      }
    } catch {
      setStatus("error");
      setError("Une erreur est survenue. Réessayez !");
    }
  }

  const display = hovered || rating;

  return (
    <>
      {/* ── Google review modal ── */}
      <AnimatePresence>
        {googlePopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
              onClick={() => setGooglePopup(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-cream p-7 shadow-[0_24px_80px_rgba(0,0,0,0.18)] ring-1 ring-ink/8 sm:bottom-8"
            >
              <button
                onClick={() => setGooglePopup(false)}
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-ink/8 text-ink/50 transition hover:bg-ink/15"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3">
                <span className="text-4xl">🌟</span>
                <h3 className="font-display text-[18px] font-semibold text-ink leading-snug">
                  Un avis Google,{" "}
                  <span className="font-script text-cherry">ça change tout</span>
                </h3>
              </div>

              <p className="mt-4 text-[14px] leading-relaxed text-ink/65">
                Pour une petite caravane familiale, un avis Google c&apos;est{" "}
                <strong className="text-ink">concret</strong> : il aide les familles du quartier à nous trouver,
                il convainc les nouveaux visiteurs, et il compense les grandes enseignes qui ont des budgets pub que nous n&apos;avons pas.{" "}
                <strong className="text-ink">30 secondes de votre temps, c&apos;est notre meilleure publicité.</strong> 🙏
              </p>

              <div className="mt-3 flex items-center gap-1 text-[12px] text-ink/40">
                ⭐⭐⭐⭐⭐ &nbsp;Gratuit · anonyme · 30 secondes
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setGooglePopup(false)}
                  className="btn-liquid flex items-center justify-center gap-2 rounded-full bg-cherry px-6 py-3.5 text-sm font-semibold text-cream shadow-glow-cherry transition"
                >
                  <ExternalLink className="h-4 w-4" />
                  Laisser un avis sur Google
                </a>
                <button
                  onClick={() => setGooglePopup(false)}
                  className="rounded-full py-2.5 text-[13px] text-ink/45 transition hover:text-ink/70"
                >
                  Plus tard
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Feedback section ── */}
      <section
        id="avis"
        className="scroll-mt-24 py-16 sm:py-24"
        aria-labelledby="feedback-title"
      >
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow text-center">Votre avis</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              id="feedback-title"
              className="h-display mt-2 text-center text-3xl sm:text-4xl"
            >
              Vous avez goûté ?{" "}
              <span className="font-script text-cherry">Dites-le-nous !</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-center text-[15px] leading-relaxed text-ink/60">
              Chaque retour nous aide à parfaire la recette — et à justifier
              l&apos;achat d&apos;une deuxième plaque à crêpes.
            </p>
          </Reveal>

          <AnimatePresence mode="wait">
            {status === "ok" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 flex flex-col items-center gap-4 rounded-3xl p-10 text-center"
                style={{ background: submittedRating >= 4 ? "rgb(240 253 250)" : "rgb(249 250 251)" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                  className="grid h-16 w-16 place-items-center rounded-full bg-teal-500 text-cream shadow-glow"
                >
                  <Check className="h-8 w-8" />
                </motion.div>
                <p className="text-xl font-display font-medium text-ink">
                  {submittedRating >= 4 ? "Vous nous faites vraiment plaisir !" : "Merci pour votre retour !"}
                </p>
                <p className="text-[15px] text-ink/60">
                  {submittedRating >= 4
                    ? "Votre avis est reçu — on lit tout avec beaucoup d'attention. 🍦"
                    : "On prend votre retour très au sérieux pour s'améliorer. Merci."}
                </p>
                {submittedRating >= 4 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-[13px] text-ink/40 animate-pulse"
                  >
                    Un petit bonus arrive…
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                onSubmit={submit}
                className="mt-10 space-y-6"
              >
                {/* Star rating */}
                <div className="flex flex-col items-center gap-3">
                  <span className="text-[12.5px] font-semibold uppercase tracking-wider text-ink/50">
                    Votre note
                  </span>
                  <div
                    className="flex gap-2"
                    onMouseLeave={() => setHovered(0)}
                    role="group"
                    aria-label="Note sur 5 étoiles"
                  >
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        aria-label={`${s} étoile${s > 1 ? "s" : ""}`}
                        onMouseEnter={() => setHovered(s)}
                        onClick={() => setRating(s)}
                        className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star
                          className={`h-10 w-10 transition-colors duration-150 ${
                            s <= display ? "fill-sun-500 stroke-sun-500" : "stroke-ink/20"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <motion.p
                      key={rating}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[13px] font-medium text-ink/60"
                    >
                      {RATING_LABELS[rating]}
                    </motion.p>
                  )}
                </div>

                {/* Emoji picker */}
                <div className="flex flex-col items-center gap-3">
                  <span className="text-[12.5px] font-semibold uppercase tracking-wider text-ink/50">
                    Votre ressenti
                  </span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {EMOJIS.map((e) => (
                      <button
                        key={e.key}
                        type="button"
                        onClick={() => setEmoji(emoji === e.key ? null : e.key)}
                        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                          emoji === e.key
                            ? "border-teal-400 bg-teal-50 text-teal-700 shadow-ring"
                            : "border-ink/10 bg-white/70 text-ink/70 hover:border-ink/25"
                        }`}
                      >
                        <span className="text-xl leading-none">{e.icon}</span>
                        {e.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-[12.5px] font-semibold uppercase tracking-wider text-ink/50 mb-1.5">
                    Un mot (facultatif)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="La crêpe au beurre salé était… inoubliable. Ou alors les gaufres ? Les deux ? Difficile."
                    rows={4}
                    maxLength={2000}
                    className="w-full resize-y rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-[15px] text-ink placeholder-ink/30 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
                  />
                </div>

                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                {errorMsg && (
                  <p className="text-center text-[13px] text-cherry font-medium">{errorMsg}</p>
                )}

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-liquid group inline-flex items-center gap-2 rounded-full bg-cherry px-8 py-3.5 text-sm font-semibold text-cream shadow-glow-cherry transition disabled:opacity-60 cursor-pointer"
                  >
                    {status === "loading" ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                    ) : (
                      <Heart className="h-4 w-4 transition group-hover:scale-110" />
                    )}
                    Envoyer mon avis
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
