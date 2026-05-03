"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Check, Heart } from "lucide-react";
import { Reveal } from "./Reveal";

type EmojiKey = "love" | "good" | "meh" | "bad";
const EMOJIS: { key: EmojiKey; icon: string; label: string }[] = [
  { key: "love", icon: "😍", label: "Coup de cœur" },
  { key: "good", icon: "😊", label: "Bien" },
  { key: "meh",  icon: "😐", label: "Moyen" },
  { key: "bad",  icon: "😕", label: "Décevant" },
];

type Status = "idle" | "loading" | "ok" | "error";

export function Feedback() {
  const [rating,  setRating]  = useState(0);
  const [hovered, setHovered] = useState(0);
  const [emoji,   setEmoji]   = useState<EmojiKey | null>(null);
  const [comment, setComment] = useState("");
  const [status,  setStatus]  = useState<Status>("idle");
  const [errorMsg,setError]   = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (rating === 0) { setError("Choisissez une note en étoiles."); return; }
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ rating, emoji, comment }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("Une erreur est survenue. Réessayez !");
    }
  }

  const display = hovered || rating;

  return (
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
            l&apos;achat d&apos;un deuxième billig.
          </p>
        </Reveal>

        <AnimatePresence mode="wait">
          {status === "ok" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-teal-50 p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                className="grid h-16 w-16 place-items-center rounded-full bg-teal-500 text-cream shadow-glow"
              >
                <Check className="h-8 w-8" />
              </motion.div>
              <p className="text-xl font-display font-medium text-ink">Merci infiniment !</p>
              <p className="text-[15px] text-ink/60">
                Votre avis est reçu — on lit tout, on est touchés par chaque mot. 🍦
              </p>
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
                          s <= display
                            ? "fill-sun-500 stroke-sun-500"
                            : "stroke-ink/20"
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
                    {["", "Hm… pas top.", "Peut mieux faire.", "Pas mal !", "Très bien !", "On est aux anges ! 🎉"][rating]}
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

              {/* Honeypot */}
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
  );
}
