"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Bell, Check } from "lucide-react";
import { Reveal } from "./Reveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "ok" | "error";

export function Newsletter() {
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error,  setError]  = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) { setError("Email invalide."); return; }
    setError("");
    setStatus("loading");

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
      setError("Une erreur est survenue. Réessayez !");
    }
  }

  return (
    <section
      id="newsletter"
      className="scroll-mt-24 py-12 sm:py-16"
      aria-labelledby="newsletter-title"
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <div className="glass rounded-3xl p-8 sm:p-10 text-center shadow-schedule">
            {/* Top icon */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-teal-100 shadow-soft"
            >
              <Bell className="h-7 w-7 text-teal-700" />
            </motion.div>

            <h2
              id="newsletter-title"
              className="h-display text-2xl sm:text-3xl"
            >
              Première sur le quai ?
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/60">
              Inscrivez-vous et on vous prévient dès que la caravane ouvre pour
              la saison. Pas de spam — promis sur le billig.
            </p>

            <AnimatePresence mode="wait">
              {status === "ok" ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-teal-100 px-5 py-4 text-teal-700"
                >
                  <Check className="h-5 w-5 shrink-0" />
                  <span className="text-[15px] font-medium">
                    Parfait ! On vous écrira dès l&apos;ouverture. Hâte de vous voir sur le quai 🍦
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={submit}
                  className="mt-6 flex flex-col gap-3 sm:flex-row"
                >
                  <label className="sr-only" htmlFor="newsletter-email">
                    Votre adresse email
                  </label>
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="votre@email.fr"
                      autoComplete="email"
                      className="w-full rounded-full border border-ink/10 bg-white/90 py-3.5 pl-10 pr-4 text-[15px] text-ink placeholder-ink/35 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-liquid inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3.5 text-sm font-semibold text-cream shadow-glow transition hover:bg-teal-600 disabled:opacity-60 cursor-pointer"
                  >
                    {status === "loading" ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                    ) : (
                      <Bell className="h-4 w-4" />
                    )}
                    Me prévenir
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {error && (
              <p className="mt-2 text-center text-[13px] text-cherry font-medium">{error}</p>
            )}

            <p className="mt-4 text-[11.5px] text-ink/40">
              Un email, une seule fois. Votre adresse ne sera jamais partagée.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
