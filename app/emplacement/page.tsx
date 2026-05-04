import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Navigation, Train, Bike, Clock, Calendar, ArrowRight, Instagram, Facebook, Music2, Twitter } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CopyAddressButton } from "@/components/CopyAddressButton";
import { Newsletter } from "@/components/Newsletter";
import { SectionBanner } from "@/components/SectionBanner";

export const metadata: Metadata = {
  title: "Nous trouver — Quai de Seine, La Frette-sur-Seine (95530)",
  description:
    "Glaces en Seine est installée Quai de Seine, juste en face de la mairie de La Frette-sur-Seine (95530). Ouverte sam·dim·fériés de 14h à 19h, de mai à septembre. Accès SNCF Ligne J et véloroute des bords de Seine.",
  alternates: { canonical: "/emplacement" },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Où est située la caravane Glaces en Seine ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La caravane Glaces en Seine est installée Quai de Seine, juste en face de la mairie de La Frette-sur-Seine (95530), dans le Val-d'Oise. Elle longe le quai entre La Frette-sur-Seine et Cormeilles-en-Parisis.",
      },
    },
    {
      "@type": "Question",
      name: "Quels sont les horaires d'ouverture ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glaces en Seine est ouverte les samedis, dimanches et jours fériés, de 14h à 19h, de mai à septembre.",
      },
    },
    {
      "@type": "Question",
      name: "Comment venir à Glaces en Seine en transports ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Par le train : SNCF Ligne J, gare La Frette-Montigny, puis 10 minutes à pied le long du quai. À vélo : accès direct depuis la véloroute des bords de Seine. En voiture : parking sur le quai et autour de la mairie via la D48.",
      },
    },
    {
      "@type": "Question",
      name: "Que propose Glaces en Seine ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glaces artisanales, crêpes et gaufres préparées devant vous, ainsi que boissons fraîches. Toute la carte est servie en saison sur les quais de Seine.",
      },
    },
  ],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      <SectionBanner src="/bannnersmall.png" alt="Emplacement Glaces en Seine — Quai de Seine, La Frette-sur-Seine">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300 drop-shadow">
          Où nous trouver
        </p>
        <h1 className="h-display text-3xl text-cream drop-shadow-md sm:text-4xl lg:text-5xl">
          Face à la{" "}
          <span className="font-script text-cherry">mairie</span>, au bord de l&apos;eau
        </h1>
        <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-cream/95 drop-shadow sm:text-[15px]">
          Quai de Seine, juste en face de la mairie de La Frette-sur-Seine —
          repérez la caravane vert tendre.
        </p>
      </SectionBanner>
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-blob bg-teal-100 opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-48 h-64 w-64 rounded-blob bg-sun-100 opacity-50 blur-3xl" />

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">

          <div className="mt-0 grid gap-8 lg:grid-cols-2">

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

          {/* Suivez-nous */}
          <Reveal delay={0.18}>
            <div className="mt-16">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">Suivez-nous</p>
                  <h2 className="h-display mt-1 text-2xl sm:text-3xl">
                    Restez{" "}
                    <span className="font-script text-cherry">au courant</span>
                  </h2>
                </div>
              </div>

              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <li>
                  <a
                    href="https://instagram.com/glacesenseine"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram @glacesenseine"
                    className="group flex h-full flex-col gap-2 rounded-2xl bg-cream p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-ring"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-sun text-ink">
                      <Instagram className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-ink/45">Instagram</div>
                      <div className="text-[14px] font-semibold text-ink group-hover:text-cherry">@glacesenseine</div>
                    </div>
                  </a>
                </li>

                <SocialPlaceholder icon={<Facebook className="h-4 w-4" />} label="Facebook" />
                <SocialPlaceholder icon={<Music2 className="h-4 w-4" />} label="TikTok" />
                <SocialPlaceholder icon={<Twitter className="h-4 w-4" />} label="X / Twitter" />
              </ul>
            </div>
          </Reveal>

          {/* Newsletter */}
          <div className="mt-12">
            <Newsletter />
          </div>

          {/* Back */}
          <Reveal delay={0.22}>
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

function SocialPlaceholder({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li>
      <div
        aria-disabled
        title={`${label} — bientôt`}
        className="flex h-full cursor-not-allowed flex-col gap-2 rounded-2xl bg-cream/60 p-4 opacity-60 ring-1 ring-ink/5"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink/5 text-ink/55">
          {icon}
        </span>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-ink/40">{label}</div>
          <div className="text-[12.5px] font-medium text-ink/55">Bientôt</div>
        </div>
      </div>
    </li>
  );
}
