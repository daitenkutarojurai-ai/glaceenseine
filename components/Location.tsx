"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Navigation, Train, Bike } from "lucide-react";
import { Reveal } from "./Reveal";

const ADDRESS = "Quai de Seine, face à la mairie · 95530 La Frette-sur-Seine";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Mairie+de+La+Frette-sur-Seine+95530";
// Lat/lng for the embed — same coordinates used by the briefing engine
const EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=2.1736%2C48.9793%2C2.1936%2C48.9893&layer=mapnik&marker=48.9843%2C2.1836";

export function Location() {
  return (
    <section
      id="emplacement"
      className="relative cv-auto py-20 sm:py-28"
      aria-labelledby="loc-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> Emplacement
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="loc-title" className="h-display mt-3 text-4xl sm:text-5xl">
                Face à la mairie de{" "}
                <span className="font-script text-cherry">La Frette</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink/70">
                On est là chaque samedi, dimanche et jour férié, sur le quai
                ombragé qui longe la Seine entre La Frette et Cormeilles-en-Parisis.
                Repérez la caravane vert tendre.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 rounded-3xl bg-cream p-6 shadow-soft ring-1 ring-ink/5">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-700">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-semibold text-ink">Quai de Seine</div>
                    <div className="text-sm text-ink/65">
                      Face à la mairie · 95530 La Frette-sur-Seine
                    </div>
                  </div>
                </div>

                <Link
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-liquid group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-cream shadow-soft hover:shadow-glow"
                  onMouseMove={(e) => {
                    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    (e.currentTarget as HTMLElement).style.setProperty(
                      "--x",
                      `${e.clientX - r.left}px`,
                    );
                    (e.currentTarget as HTMLElement).style.setProperty(
                      "--y",
                      `${e.clientY - r.top}px`,
                    );
                  }}
                >
                  <Navigation className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  Ouvrir dans Google Maps
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-6 grid gap-3 text-sm text-ink/70 sm:grid-cols-2">
                <li className="flex items-center gap-3 rounded-2xl bg-cream/60 px-4 py-3">
                  <Train className="h-4 w-4 text-teal-700" />
                  <span>SNCF Ligne J · gare La Frette-Montigny — 10 min à pied</span>
                </li>
                <li className="flex items-center gap-3 rounded-2xl bg-cream/60 px-4 py-3">
                  <Bike className="h-4 w-4 text-teal-700" />
                  <span>Véloroute des bords de Seine, accès direct</span>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-ring sm:aspect-[5/4]"
            >
              <iframe
                title="Carte — Glaces en Seine"
                src={EMBED_SRC}
                className="pointer-events-none absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-hidden="true"
                tabIndex={-1}
              />
              {/* Click-through overlay — opens Google Maps in a new tab */}
              <Link
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir la carte dans Google Maps"
                className="absolute inset-0 z-[1]"
              />
              {/* Overlay pin badge */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-cherry text-cream shadow-glow ring-4 ring-cream">
                    <MapPin className="h-6 w-6" />
                  </span>
                  <span className="mt-1 h-3 w-3 rounded-full bg-cherry/40 blur-[3px]" />
                </motion.div>
              </div>

              <Link
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-[2] inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-3.5 py-2 text-[12.5px] font-semibold text-ink shadow-soft backdrop-blur transition hover:bg-cream"
              >
                <Navigation className="h-3.5 w-3.5" /> Itinéraire
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
