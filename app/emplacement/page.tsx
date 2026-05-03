import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Navigation, Train, Bike, Clock, Calendar, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CopyAddressButton } from "@/components/CopyAddressButton";

export const metadata: Metadata = {
  title: "Nous trouver — Glaces en Seine · La Frette-sur-Seine",
  description:
    "Glaces en Seine est installée Quai de Seine, juste en face de la mairie de La Frette-sur-Seine (95530). Ouverte sam·dim·fériés de 14h à 19h, de mai à septembre.",
};

const MAPS_DIR_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Mairie+de+La+Frette-sur-Seine+95530";
const MAPS_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=Mairie+de+La+Frette-sur-Seine+95530";
const EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=2.1736%2C48.9793%2C2.1936%2C48.9893&layer=mapnik&marker=48.9843%2C2.1836";
const FULL_ADDRESS = "Quai de Seine, face à la mairie — 95530 La Frette-sur-Seine";

export default function EmplacementPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-blob bg-teal-100 opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-48 h-64 w-64 rounded-blob bg-sun-100 opacity-50 blur-3xl" />

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">

          {/* Header */}
          <Reveal>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-widest text-teal-700">
              <MapPin className="h-3.5 w-3.5" />
              Où nous trouver
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="h-display mt-3 text-4xl sm:text-5xl">
              Face à la{" "}
              <span className="font-script text-cherry">mairie</span>,<br />
              au bord de l&apos;eau.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/60">
              On est installées <strong className="text-ink">juste en face de la mairie de La Frette-sur-Seine</strong> —
              sur le quai ombragé qui longe la Seine. Repérez la caravane vert tendre, vous ne pouvez pas nous louper.{" "}
              <span className="text-ink/40">(et si vous nous loupez, c&apos;est que vous avez faim d&apos;autre chose, on ne juge pas.)</span>
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">

            {/* Left — address card + CTA */}
            <div className="space-y-5">
              <Reveal delay={0.12}>
                <div className="rounded-3xl bg-cream p-6 shadow-ring sm:p-8">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-100 text-teal-700 shadow-soft">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-display text-[18px] font-semibold text-ink">Glaces en Seine</div>
                      <div className="mt-1 text-[15px] leading-relaxed text-ink/70">
                        Quai de Seine, <strong className="text-ink">face à la mairie</strong>
                        <br />95530 La Frette-sur-Seine
                      </div>
                      <div className="mt-1 text-[13px] text-ink/45 italic">
                        Mairie : Place de la Mairie, 95530 La Frette-sur-Seine
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 rounded-2xl bg-teal-50 px-4 py-3">
                      <Calendar className="h-4 w-4 shrink-0 text-teal-600" />
                      <span className="text-[13px] font-medium text-teal-800">Sam · Dim · Fériés</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl bg-cherry/8 px-4 py-3">
                      <Clock className="h-4 w-4 shrink-0 text-cherry" />
                      <span className="text-[13px] font-medium text-cherry">14h – 19h</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={MAPS_DIR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-liquid group flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[13px] font-semibold text-cream shadow-soft transition hover:shadow-glow"
                    >
                      <Navigation className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      Obtenir l&apos;itinéraire
                    </Link>
                    <CopyAddressButton address={FULL_ADDRESS} />
                  </div>

                  <Link
                    href={MAPS_SEARCH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex w-full items-center justify-center gap-1.5 text-[12px] text-ink/45 transition hover:text-ink/70"
                  >
                    Voir sur Google Maps
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </Reveal>

              {/* Transport */}
              <Reveal delay={0.16}>
                <div className="rounded-3xl bg-cream p-6 shadow-soft">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/40">Comment venir</div>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                        <Train className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-[14px] font-semibold text-ink">SNCF Ligne J</div>
                        <div className="text-[13px] text-ink/60">Gare La Frette-Montigny — 10 min à pied le long du quai</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-green-50 text-green-600">
                        <Bike className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-[14px] font-semibold text-ink">Véloroute des bords de Seine</div>
                        <div className="text-[13px] text-ink/60">Accès direct depuis la piste cyclable</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sun-100 text-amber-600">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-[14px] font-semibold text-ink">En voiture</div>
                        <div className="text-[13px] text-ink/60">Parking sur le quai et autour de la mairie — accès depuis la D48</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Right — Map */}
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-ring sm:aspect-[4/4] lg:aspect-auto lg:h-full lg:min-h-[480px]">
                <iframe
                  title="Carte — Glaces en Seine, La Frette-sur-Seine"
                  src={EMBED_SRC}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* floating badge */}
                <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-2xl bg-cream/95 px-4 py-2.5 shadow-soft backdrop-blur">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-500" />
                  </span>
                  <span className="text-[12px] font-semibold text-teal-800">On est là !</span>
                </div>
                <Link
                  href={MAPS_DIR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-4 py-2 text-[12.5px] font-semibold text-ink shadow-soft backdrop-blur transition hover:bg-cream"
                >
                  <Navigation className="h-3.5 w-3.5" /> Itinéraire
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Back */}
          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[14px] text-ink/50 transition hover:text-ink"
              >
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                Retour à l&apos;accueil
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
