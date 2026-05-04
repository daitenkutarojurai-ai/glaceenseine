"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertTriangle, Users, Calendar, MapPin } from "lucide-react";

type Status = "idle" | "loading" | "ok" | "error";

const EVENT_TYPES = ["Mariage / PACS", "Événement entreprise", "Anniversaire / fête", "Fête de quartier / brocante", "Autre"];

export function PrivatisationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error,  setError]  = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    // Capturer le formulaire avant tout `await` : `e.currentTarget` est nullifié
    // par React dès que le handler async rend la main.
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/privatisation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j?.message ?? "Une erreur est survenue.");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "ok" ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-5 py-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
            className="grid h-16 w-16 place-items-center rounded-full bg-teal-500 text-cream shadow-glow"
          >
            <Check className="h-8 w-8" />
          </motion.div>
          <p className="text-xl font-display font-medium text-ink">Demande reçue !</p>
          <p className="max-w-sm text-[15px] text-ink/60">
            On revient vers vous sous 24 h avec un devis sur-mesure.
            Hâte de faire partie de votre événement 🍦
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-5"
          noValidate
        >
          {/* Identity */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field name="name"  label="Votre prénom / nom"  required autoComplete="name" />
            <Field name="email" label="Email" type="email" required autoComplete="email" />
          </div>
          <Field name="phone" label="Téléphone" type="tel" placeholder="06 …" autoComplete="tel" />

          {/* Event type */}
          <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wider text-ink/55">
              Type d&apos;événement <span className="text-cherry">*</span>
            </label>
            <select
              name="eventType"
              required
              defaultValue=""
              className="w-full cursor-pointer rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-[15px] text-ink outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            >
              <option value="" disabled>Choisissez…</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Date + guests */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wider text-ink/55">
                <Calendar className="mr-1 inline h-3.5 w-3.5" />
                Date envisagée
              </label>
              <input
                name="date"
                type="date"
                className="w-full rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-[15px] text-ink outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wider text-ink/55">
                <Users className="mr-1 inline h-3.5 w-3.5" />
                Nombre d&apos;invités
              </label>
              <input
                name="guests"
                type="number"
                min={10}
                placeholder="ex. 80"
                className="w-full rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-[15px] text-ink placeholder-ink/35 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wider text-ink/55">
              <MapPin className="mr-1 inline h-3.5 w-3.5" />
              Lieu de l&apos;événement
            </label>
            <input
              name="location"
              type="text"
              placeholder="Ville, salle, jardin privé…"
              className="w-full rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-[15px] text-ink placeholder-ink/35 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wider text-ink/55">
              Votre projet en quelques mots
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder="Racontez-nous votre événement, vos envies, vos contraintes…"
              className="w-full resize-y rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-[15px] text-ink placeholder-ink/30 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          {/* Honeypot */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 rounded-2xl bg-rose-100 px-4 py-3 text-sm text-cherry"
                role="alert"
              >
                <AlertTriangle className="h-4 w-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12.5px] text-ink/50">
              Réponse sous 24 h · Devis gratuit · Aucun engagement
            </p>
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-liquid group inline-flex items-center justify-center gap-2 rounded-full bg-cherry px-7 py-3.5 text-sm font-semibold text-cream shadow-glow-cherry transition disabled:opacity-60 cursor-pointer"
            >
              {status === "loading" ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
              ) : (
                <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
              )}
              Envoyer ma demande
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  label, name, type = "text", required, placeholder, autoComplete,
}: {
  label: string; name: string; type?: string;
  required?: boolean; placeholder?: string; autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wider text-ink/55">
        {label} {required && <span className="text-cherry">*</span>}
      </span>
      <input
        name={name} type={type} required={required}
        placeholder={placeholder} autoComplete={autoComplete}
        className="w-full rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-[15px] text-ink placeholder-ink/35 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
      />
    </label>
  );
}
