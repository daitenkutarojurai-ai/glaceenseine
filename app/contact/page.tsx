import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, Facebook, MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { SOCIAL } from "@/lib/social";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Mairie+de+La+Frette-sur-Seine+95530";
const GOOGLE_REVIEW_URL = "https://g.page/r/CcKQvU-g5mpzEBM/review";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Feedback } from "@/components/Feedback";
import { SectionBanner } from "@/components/SectionBanner";

export const metadata: Metadata = {
  title: "Contact & Avis — écrivez à Glaces en Seine",
  description:
    "Une question, un mot doux, un avis sur votre visite ? Contactez Glaces en Seine via notre formulaire ou venez nous voir sur le quai à La Frette-sur-Seine (95530).",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Avis — Glaces en Seine",
    description: "Écrivez-nous, déposez un avis ou suivez-nous sur Instagram @glaceenseine.",
    url: "https://glaceenseine.fr/contact",
    images: [{ url: "/glaceensein1.png", width: 1200, height: 630, alt: "Glaces en Seine — contactez-nous" }],
  },
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <SectionBanner src="/bannersmalllast.png" alt="Contactez Glaces en Seine — formulaire et coordonnées">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300 drop-shadow">
          Nous contacter
        </p>
        <h1 className="h-display text-3xl text-cream drop-shadow-md sm:text-4xl lg:text-5xl">
          Dites-nous{" "}
          <span className="font-script text-cherry">bonjour</span>
        </h1>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-cream/95 drop-shadow sm:text-[15px]">
          Une question, une privatisation, un mot gentil, une suggestion de
          parfum ? On lit tout, on répond presque toujours.
        </p>
      </SectionBanner>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-blob bg-gradient-sun opacity-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-blob bg-teal-100 opacity-60 blur-3xl" />

      {/* ── Contact form ── */}
      <section className="relative py-16 sm:py-24" aria-labelledby="contact-title">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left — info cards */}
            <div>
              <div className="grid gap-3">
                <Reveal delay={0.08}>
                  <a
                    href={GOOGLE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-cream p-4 shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-ring hover:ring-sun-300"
                  >
                    <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-sun-300 to-sun-500 opacity-0 transition group-hover:opacity-100" />
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-tr from-sun-300 to-sun-500 text-white shadow-soft">
                      <Star className="h-5 w-5 fill-current" />
                    </span>
                    <div className="flex-1">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">Avis Google</div>
                      <div className="font-semibold text-ink group-hover:text-cherry">Laisser un avis ⭐⭐⭐⭐⭐</div>
                    </div>
                    <ArrowRight className="h-4 w-4 -translate-x-2 text-ink/35 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </Reveal>
                <Reveal delay={0.1}>
                  <a
                    href={SOCIAL.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-cream p-4 shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-ring hover:ring-rose-300"
                  >
                    <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#F58529] via-[#DD2A7B] to-[#8134AF] opacity-0 transition group-hover:opacity-100" />
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-soft">
                      <Instagram className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">Instagram</div>
                      <div className="font-semibold text-ink group-hover:text-cherry">{SOCIAL.instagram.handle}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 -translate-x-2 text-ink/35 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </Reveal>
                <Reveal delay={0.15}>
                  <a
                    href={SOCIAL.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-cream p-4 shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-ring hover:ring-[#1877F2]/40"
                  >
                    <span className="absolute inset-y-0 left-0 w-1.5 bg-[#1877F2] opacity-0 transition group-hover:opacity-100" />
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#1877F2] text-white shadow-soft">
                      <Facebook className="h-5 w-5 fill-current" />
                    </span>
                    <div className="flex-1">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">Facebook</div>
                      <div className="font-semibold text-ink group-hover:text-cherry">Glace en Seine</div>
                    </div>
                    <ArrowRight className="h-4 w-4 -translate-x-2 text-ink/35 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </Reveal>
                <Reveal delay={0.15}>
                  <Link
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-cream p-4 shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-ring hover:ring-teal-300"
                  >
                    <span className="absolute inset-y-0 left-0 w-1.5 bg-teal-500 opacity-0 transition group-hover:opacity-100" />
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-500 text-white shadow-soft">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">Sur place</div>
                      <div className="font-semibold text-ink group-hover:text-cherry">Face à la mairie · Quai de La Frette-sur-Seine</div>
                    </div>
                    <ArrowRight className="h-4 w-4 -translate-x-2 text-ink/35 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl bg-cream p-4 shadow-soft ring-1 ring-ink/5">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-cherry text-cream shadow-soft">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">Horaires</div>
                      <div className="font-semibold text-ink">Sam · Dim · fériés · 14h–19h</div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right — form */}
            <Reveal delay={0.1}>
              <div className="rounded-[2rem] bg-cream p-7 shadow-ring sm:p-9">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
      </div>

      {/* ── Feedback ── */}
      <Feedback />
    </div>
  );
}
