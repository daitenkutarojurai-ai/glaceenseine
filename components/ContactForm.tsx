"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertTriangle } from "lucide-react";

const SUBJECTS = [
  "Privatisation / événement",
  "Question sur la carte",
  "Idée de parfum ou de recette",
  "Comment nous améliorer",
  "Signaler un bug sur le site",
  "Autre",
];

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "loading") return;
    setState({ kind: "loading" });

    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j?.message ?? "Une erreur est survenue.");
      setState({ kind: "ok" });
      e.currentTarget.reset();
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Erreur inconnue.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Votre prénom" required autoComplete="name" />
        <Field name="email" type="email" label="Votre email" required autoComplete="email" />
      </div>

      {/* Subject select */}
      <div>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wider text-ink/55">
            Sujet
          </span>
          <select
            name="subject"
            className="w-full cursor-pointer appearance-none rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-[15px] text-ink outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            defaultValue=""
          >
            <option value="" disabled>Choisir un sujet…</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <Textarea
        name="message"
        label="Votre message"
        required
        placeholder="Racontez-nous tout."
      />
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="flex flex-col-reverse items-stretch gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] text-ink/55">
          On répond sous 48 h. Souvent plus vite si le soleil brille.
        </p>
        <button
          type="submit"
          disabled={state.kind === "loading"}
          className="btn-liquid group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream shadow-soft transition hover:shadow-glow disabled:opacity-60"
        >
          {state.kind === "loading" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
          ) : (
            <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
          )}
          Envoyer
        </button>
      </div>

      <AnimatePresence>
        {state.kind === "ok" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 rounded-2xl bg-teal-100 px-4 py-3 text-sm text-teal-700"
            role="status"
          >
            <Check className="h-4 w-4" />
            Merci ! Votre message est arrivé. À très vite sur le quai.
          </motion.div>
        )}
        {state.kind === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 rounded-2xl bg-rose-100 px-4 py-3 text-sm text-cherry"
            role="alert"
          >
            <AlertTriangle className="h-4 w-4" />
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wider text-ink/55">
        {label} {required && <span className="text-cherry">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-[15px] text-ink placeholder-ink/35 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wider text-ink/55">
        {label} {required && <span className="text-cherry">*</span>}
      </span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={5}
        className="w-full resize-y rounded-2xl border border-ink/10 bg-white/80 px-4 py-3 text-[15px] text-ink placeholder-ink/35 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
      />
    </label>
  );
}
