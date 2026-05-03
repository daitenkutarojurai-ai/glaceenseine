"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, IceCream } from "lucide-react";

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
    <section className="py-10 sm:py-14" aria-label="Newsletter">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-50 to-sun-100 px-6 py-7 shadow-soft sm:px-10">
          {/* Floating ice cream decoration */}
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-2 -top-2 opacity-20 sm:opacity-30"
          >
            <IceCream className="h-20 w-20 text-teal-600" />
          </motion.div>

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            {/* Bell icon */}
            <div className="shrink-0">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-500 shadow-glow">
                <Bell className="h-5 w-5 text-cream" />
              </div>
            </div>

            {/* Copy */}
            <div className="flex-1">
              <p className="font-display text-[16px] font-semibold text-ink sm:text-[17px]">
                On ouvre bientôt ? Soyez la première au courant 🍦
              </p>
              <p className="mt-0.5 text-[13px] text-ink/55">
                Un email, une seule fois, quand la saison démarre. Promis sur le billig.
              </p>
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              {status === "ok" ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-[13px] font-semibold text-cream shadow-glow">
                  <Check className="h-4 w-4" />
                  Inscrit·e !
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onSubmit={submit}
                  className="flex shrink-0 gap-2">
                  <label className="sr-only" htmlFor="nl-email">Email</label>
                  <input
                    id="nl-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="votre@email.fr"
                    autoComplete="email"
                    className="w-36 rounded-full border border-ink/10 bg-white/90 px-4 py-2 text-[13px] text-ink placeholder-ink/35 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100 sm:w-44"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-full bg-teal-500 px-4 py-2 text-[13px] font-semibold text-cream shadow-glow transition hover:bg-teal-600 disabled:opacity-60 cursor-pointer"
                  >
                    {status === "loading"
                      ? <span className="block h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                      : "Me prévenir"
                    }
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {error && (
            <p className="mt-2 text-center text-[12px] text-cherry font-medium">{error}</p>
          )}
        </div>
      </div>
    </section>
  );
}
