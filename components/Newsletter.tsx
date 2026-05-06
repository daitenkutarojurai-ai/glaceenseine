"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, IceCream } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error,  setError]  = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) { setError("Email invalide."); return; }
    setError(""); setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("Une erreur est survenue.");
    }
  }

  return (
    <section id="newsletter" className="cv-auto py-10 sm:py-14" aria-label="Newsletter">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-br from-teal-50 via-cream to-sun-100 p-5 shadow-ring sm:p-7"
        >
          <div className="flex flex-col items-center text-center">
            <motion.span
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-11 w-11 place-items-center rounded-full bg-teal-500 text-cream shadow-glow"
              aria-hidden
            >
              <IceCream className="h-5 w-5" />
            </motion.span>
            <h2 className="h-display mt-3 text-xl sm:text-2xl">
              📬 Le mail <span className="font-script text-cherry">du quai</span>
            </h2>
            <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-ink/60 sm:text-[14px]">
              Rejoins l&apos;équipage. On te dit où on s&apos;installe 24h avant le
              prochain rassemblement — ça reste entre nous 🤫
            </p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {status !== "ok" ? (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mx-auto mt-5 flex w-full max-w-md flex-col gap-2 sm:flex-row"
              >
                <label className="sr-only" htmlFor="nl-email">Email</label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="votre@email.fr"
                  autoComplete="email"
                  className="min-w-0 flex-1 rounded-full bg-white/95 px-5 py-3 text-[14px] text-ink placeholder-ink/35 outline-none ring-1 ring-ink/5 transition focus:ring-2 focus:ring-teal-300"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 rounded-full bg-teal-500 px-6 py-3 text-[13px] font-semibold text-cream shadow-glow transition hover:bg-teal-600 disabled:opacity-60 cursor-pointer sm:text-[13.5px]"
                >
                  {status === "loading"
                    ? <span className="mx-auto block h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                    : "Allez, embarque-moi 🛶"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 rounded-full bg-teal-100 px-5 py-3 text-[13.5px] font-semibold text-teal-700"
              >
                <Check className="h-4 w-4" /> C&apos;est noté ! On vous écrit dès que ça bouge.
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <p className="mt-2 text-center text-[12px] font-medium text-cherry">{error}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
