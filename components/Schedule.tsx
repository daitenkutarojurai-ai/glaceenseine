"use client";

import { motion } from "framer-motion";
import { Clock, CalendarDays, Sun, Snowflake } from "lucide-react";
import { Reveal } from "./Reveal";

const days = [
  { d: "Lun.", open: false },
  { d: "Mar.", open: false },
  { d: "Mer.", open: false },
  { d: "Jeu.", open: false },
  { d: "Ven.", open: false },
  { d: "Sam.", open: true },
  { d: "Dim.", open: true },
];

export function Schedule() {
  return (
    <section
      id="horaires"
      className="relative scroll-mt-24 bg-gradient-river py-28 sm:py-36"
      aria-labelledby="sched-title"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> Horaires
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="sched-title"
                className="h-display mt-3 text-4xl sm:text-5xl"
              >
                Le rituel du{" "}
                <span className="font-script text-cherry">week-end</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink/70">
                On ouvre uniquement les samedis, dimanches et jours fériés, de
                14 h à 19 h. La saison court de début mai à fin septembre.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Reveal delay={0.12}>
                <div className="flex items-center gap-3 rounded-2xl bg-cream p-4 shadow-soft">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-sun-100">
                    <Sun className="h-4 w-4 text-cherry" />
                  </span>
                  <div>
                    <div className="text-[12px] font-semibold uppercase tracking-wider text-ink/50">
                      Saison
                    </div>
                    <div className="text-sm font-semibold text-ink">
                      Mai → Septembre
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="flex items-center gap-3 rounded-2xl bg-cream p-4 shadow-soft">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-teal-100">
                    <Snowflake className="h-4 w-4 text-teal-700" />
                  </span>
                  <div>
                    <div className="text-[12px] font-semibold uppercase tracking-wider text-ink/50">
                      Hors saison
                    </div>
                    <div className="text-sm font-semibold text-ink">
                      Repos, on revient
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Visual week block */}
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-cream shadow-ring"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cherry/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-2 text-sun-300">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-[12.5px] font-semibold uppercase tracking-[0.2em]">
                    La semaine
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-7 gap-2">
                  {days.map((day, i) => (
                    <motion.div
                      key={day.d}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * i, duration: 0.4 }}
                      className={`flex flex-col items-center rounded-xl px-1.5 py-3 text-center text-[12px] font-semibold ${
                        day.open
                          ? "bg-sun-300 text-ink"
                          : "bg-white/10 text-cream/70"
                      }`}
                    >
                      <span>{day.d}</span>
                      <span
                        className={`mt-2 h-1 w-1 rounded-full ${
                          day.open ? "bg-cherry" : "bg-cream/20"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl bg-white/5 p-5">
                  <div className="text-[12px] uppercase tracking-[0.2em] text-cream/50">
                    Heures d'ouverture
                  </div>
                  <div className="mt-1 flex items-baseline gap-3">
                    <span className="font-display text-4xl text-cream">14h</span>
                    <span className="text-cream/40">→</span>
                    <span className="font-display text-4xl text-cream">19h</span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-cream/70">
                    Sam. · Dim. · jours fériés. On reste tant qu'il y a du soleil
                    — et un peu après, si vous insistez.
                  </p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
