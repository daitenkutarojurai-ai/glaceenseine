"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, IceCream, Cookie, CakeSlice } from "lucide-react";

const PILLS = [
  { icon: IceCream, label: "Glaces artisanales", color: "bg-rose-100 text-cherry" },
  { icon: Cookie,   label: "Crêpes billig",       color: "bg-sun-100 text-ink" },
  { icon: CakeSlice,label: "Gaufres minute",       color: "bg-teal-100 text-teal-700" },
];

export function MenuBanner() {
  return (
    <section
      id="menu"
      className="scroll-mt-20 py-10 sm:py-16"
      aria-label="Notre carte"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Label */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">La carte</p>
            <h2 className="h-display mt-1 text-2xl sm:text-3xl">
              Trois douceurs,{" "}
              <span className="font-script text-cherry">une caravane</span>.
            </h2>
          </div>
          <Link
            href="/menu"
            className="group hidden shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream shadow-soft transition hover:shadow-glow-cherry sm:inline-flex"
          >
            Voir tout
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Clickable menu image — replace /menunew.png with your menu photo */}
        <Link href="/menu" className="group block" aria-label="Voir la carte complète">
          <motion.div
            whileHover={{ scale: 1.012 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl shadow-ring"
          >
            <div className="relative h-[260px] w-full sm:h-[380px]">
              <Image
                src="/menunew.png"
                alt="La carte Glaces en Seine"
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
              {/* CTA pill */}
              <div className="absolute bottom-5 right-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream/90 px-5 py-2.5 text-[13px] font-semibold text-ink shadow-soft backdrop-blur transition group-hover:bg-cream">
                  Voir la carte complète
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </div>
              {/* Category pills bottom-left */}
              <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                {PILLS.map((p) => (
                  <span
                    key={p.label}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold shadow-soft backdrop-blur ${p.color}`}
                  >
                    <p.icon className="h-3.5 w-3.5" />
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Mobile CTA */}
        <div className="mt-4 sm:hidden">
          <Link
            href="/menu"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 text-sm font-semibold text-cream shadow-soft"
          >
            Voir la carte complète
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
