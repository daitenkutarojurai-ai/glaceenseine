import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, MapPin, Clock } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Mairie+de+La+Frette-sur-Seine+95530";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Feedback } from "@/components/Feedback";
import { SectionBanner } from "@/components/SectionBanner";

export const metadata: Metadata = {
  title: "Contact & Avis — écrivez à Glaces en Seine",
  description:
    "Une question, un mot doux, un avis sur votre visite ? Contactez Glaces en Seine via notre formulaire ou venez nous voir sur le quai à La Frette-sur-Seine (95530).",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <SectionBanner src="/section-a-2026.png" alt="Contactez Glaces en Seine — formulaire et coordonnées">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-teal-400">
          Nous contacter
        </p>
        <h1 className="h-display text-3xl text-cream drop-shadow-sm sm:text-4xl lg:text-5xl">
          Dites-nous{" "}
          <span className="font-script text-cherry">bonjour</span>.
        </h1>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-cream/80 drop-shadow-sm sm:text-[15px]">
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
                <Reveal delay={0.1}>
                  <a
                    href="https://instagram.com/glacesenseine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl bg-cream p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-ring"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-sun text-ink">
                      <Instagram className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-[12px] font-semibold uppercase tracking-wider text-ink/50">Instagram</div>
                      <div className="font-semibold text-ink group-hover:text-cherry">@glacesenseine</div>
                    </div>
                  </a>
                </Reveal>
                <Reveal delay={0.15}>
                  <Link
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl bg-cream p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-ring"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-100 text-teal-700">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-[12px] font-semibold uppercase tracking-wider text-ink/50">Sur place</div>
                      <div className="font-semibold text-ink group-hover:text-cherry">Quai de Seine, La Frette-sur-Seine</div>
                    </div>
                  </Link>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="flex items-center gap-4 rounded-2xl bg-cream p-4 shadow-soft">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-sun-100 text-ink">
                      <Clock className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-[12px] font-semibold uppercase tracking-wider text-ink/50">Horaires</div>
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
