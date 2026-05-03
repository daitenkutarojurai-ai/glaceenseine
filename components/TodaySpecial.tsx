"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Sun, CloudRain, Snowflake, Cloud } from "lucide-react";

type Vibe = {
  icon: typeof Sun;
  badge: string;
  title: string;
  text: string;
  accent: string; // tailwind bg color for badge
  cta: string;
};

function pickVibe(temp: number, code: number): Vibe {
  // Open-Meteo weather code categories
  const isRain = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code);
  const isSnow = [71, 73, 75, 77, 85, 86].includes(code);
  const isCloud = [3].includes(code);

  if (isSnow) {
    return {
      icon: Snowflake,
      badge: "Hors saison",
      title: "On hiverne, mais on revient.",
      text: "La caravane fait sa pause d'hiver. Rendez-vous dès le retour des beaux jours, début mai.",
      accent: "bg-teal-100",
      cta: "Voir la saison",
    };
  }
  if (isRain) {
    return {
      icon: CloudRain,
      badge: "Aujourd'hui",
      title: "Pluie sur le quai — l'idée crêpe est bonne.",
      text: "Sucre, beurre, citron, ou l'option Nutella tiède. La caravane abrite, le billig réchauffe.",
      accent: "bg-rose-100",
      cta: "Voir les crêpes",
    };
  }
  if (temp >= 26) {
    return {
      icon: Sun,
      badge: "Aujourd'hui",
      title: "Journée parfaite pour une glace 🍦",
      text: `Il fait ${Math.round(temp)}°C — sortez les boules. Sorbet citron, fraise du Vexin, pistache : à vous de choisir.`,
      accent: "bg-sun-100",
      cta: "Voir les glaces",
    };
  }
  if (temp >= 18) {
    return {
      icon: Sun,
      badge: "Aujourd'hui",
      title: "Doux comme une fin de printemps.",
      text: "Une boule fraîche, une gaufre tiède, un transat improvisé sur l'herbe. Programme accepté ?",
      accent: "bg-peach-100",
      cta: "Voir la carte",
    };
  }
  if (isCloud) {
    return {
      icon: Cloud,
      badge: "Aujourd'hui",
      title: "Ciel doux, gourmandise tiède.",
      text: "Une gaufre dorée et une boule de vanille — le contraste juste ce qu'il faut.",
      accent: "bg-teal-100",
      cta: "Voir la carte",
    };
  }
  return {
    icon: Sparkles,
    badge: "Aujourd'hui",
    title: "Petite envie de douceur ?",
    text: "Crêpes minute, gaufres dorées, glaces artisanales. La carte vous attend.",
    accent: "bg-rose-100",
    cta: "Voir la carte",
  };
}

export function TodaySpecial() {
  const [vibe, setVibe] = useState<Vibe | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=48.9843&longitude=2.1836&current=temperature_2m,weather_code&timezone=Europe%2FParis";
    fetch(url, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((j) => {
        const t = j?.current?.temperature_2m;
        const c = j?.current?.weather_code;
        if (typeof t === "number" && typeof c === "number") {
          setVibe(pickVibe(t, c));
        }
      })
      .catch(() => {
        /* silently ignore — banner just won't render */
      });
    return () => ctrl.abort();
  }, []);

  if (!vibe) return null;
  const Icon = vibe.icon;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative mx-auto -mt-6 mb-8 max-w-6xl px-6"
      aria-label="Suggestion du jour"
    >
      <div className="relative overflow-hidden rounded-3xl bg-cream/85 p-5 shadow-ring backdrop-blur sm:p-6">
        <span
          className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full ${vibe.accent} opacity-70 blur-2xl`}
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${vibe.accent} text-ink`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700">
                {vibe.badge}
              </div>
              <div className="mt-0.5 font-display text-lg leading-snug text-ink sm:text-xl">
                {vibe.title}
              </div>
              <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-ink/65">
                {vibe.text}
              </p>
            </div>
          </div>
          <a
            href="#menu"
            className="shrink-0 rounded-full bg-ink px-4 py-2.5 text-[13px] font-semibold text-cream transition hover:bg-cherry"
          >
            {vibe.cta}
          </a>
        </div>
      </div>
    </motion.aside>
  );
}
