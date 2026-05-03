"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, IceCream, X } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [open,   setOpen]   = useState(false);
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
    <section className="py-8 sm:py-10" aria-label="Newsletter">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div
          layout
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative overflow-hidden rounded-full bg-gradient-to-r from-teal-50 to-sun-100 shadow-soft"
        >
          <AnimatePresence mode="wait" initial={false}>
            {!open && status !== "ok" && (
              <motion.button
                key="closed"
                type="button"
                onClick={() => setOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="group flex w-full items-center justify-center gap-3 px-5 py-3 text-[13.5px] font-medium text-ink/80 sm:text-[14px]"
              >
                <motion.span
                  animate={{ rotate: [-6, 6, -6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-lg"
                  aria-hidden
                >
                  🍦
                </motion.span>
                <span>
                  La saison démarre bientôt —{" "}
                  <span className="font-semibold text-teal-700 underline-offset-2 group-hover:underline">
                    me prévenir par mail
                  </span>
                </span>
              </motion.button>
            )}

            {open && status !== "ok" && (
              <motion.form
                key="open"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 px-3 py-2 sm:px-4"
              >
                <span className="hidden shrink-0 sm:inline-flex h-9 w-9 place-items-center rounded-full bg-teal-500 text-cream sm:grid">
                  <IceCream className="h-4 w-4" />
                </span>
                <label className="sr-only" htmlFor="nl-email">Email</label>
                <input
                  id="nl-email"
                  type="email"
                  value={email}
                  autoFocus
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="votre@email.fr — promis, un seul email"
                  autoComplete="email"
                  className="min-w-0 flex-1 rounded-full bg-white/90 px-4 py-2.5 text-[13px] text-ink placeholder-ink/35 outline-none ring-1 ring-ink/5 transition focus:ring-2 focus:ring-teal-300 sm:text-[14px]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 rounded-full bg-teal-500 px-4 py-2.5 text-[12.5px] font-semibold text-cream shadow-glow transition hover:bg-teal-600 disabled:opacity-60 cursor-pointer sm:text-[13px]"
                >
                  {status === "loading"
                    ? <span className="block h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                    : "Go"}
                </button>
                <button
                  type="button"
                  onClick={() => { setOpen(false); setError(""); }}
                  aria-label="Fermer"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink/40 transition hover:text-ink/70 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.form>
            )}

            {status === "ok" && (
              <motion.div
                key="ok"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex w-full items-center justify-center gap-2 px-5 py-3 text-[13.5px] font-semibold text-teal-700"
              >
                <Check className="h-4 w-4" /> Inscrit·e ! Rendez-vous au début de saison.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {error && (
          <p className="mt-2 text-center text-[12px] font-medium text-cherry">{error}</p>
        )}
      </div>
    </section>
  );
}
