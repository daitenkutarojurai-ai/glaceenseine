import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Mairie+de+La+Frette-sur-Seine+95530";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Heart, Quote } from "lucide-react";
import { SectionBanner } from "@/components/SectionBanner";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Notre histoire — la caravane Glaces en Seine",
  description:
    "L'histoire de Glaces en Seine : trois amis voisins et parents, un food truck né au bord des quais de La Frette-sur-Seine (95). Glaces artisanales, crêpes et gaufres, dans un esprit familial et convivial.",
  alternates: { canonical: "/notre-histoire" },
};

export default function HistoirePage() {
  return (
    <>
      <SectionBanner
        src="/bannnersmall.png"
        alt="L'histoire de Glaces en Seine — un food truck né au bord des quais"
      >
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300 drop-shadow">
          Notre histoire
        </p>
        <h1 className="h-display text-3xl text-cream drop-shadow-md sm:text-4xl lg:text-5xl">
          Trois amis,{" "}
          <span className="font-script text-sun-300">une caravane</span>
        </h1>
        <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-cream/95 drop-shadow sm:text-[15px]">
          Née au bord des quais de Seine, entre balades en famille et goûters
          improvisés — un projet de cœur partagé à trois.
        </p>
      </SectionBanner>

      {/* Hero photo */}
      <section className="relative px-4 pt-12 sm:px-6 sm:pt-16">
        <Reveal>
          <div className="relative mx-auto aspect-[16/9] max-w-6xl overflow-hidden rounded-[2.5rem] shadow-ring sm:aspect-[21/9]">
            <Image
              src="/camion-patronne.jpg"
              alt="Le food truck Glaces en Seine et ses trois fondateurs, sur les quais"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Story columns */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2">
          <Reveal>
            <h2 className="h-display text-3xl">Le déclic</h2>
            <p className="mt-3 text-[16.5px] leading-relaxed text-ink/70">
              Tout a commencé au bord des quais de Seine. Trois amis, voisins
              et parents, habitués à se retrouver pour de longues balades avec
              leurs enfants — entre rires, goûters improvisés et moments
              partagés au fil de l&apos;eau. Un dimanche, en regardant les enfants
              savourer une glace au soleil, l&apos;idée est née&nbsp;: créer un lieu
              gourmand, simple et authentique, qui rassemble petits et grands
              dans cette ambiance qu&apos;on aime tant.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h-display text-3xl">Un projet de cœur</h2>
            <p className="mt-3 text-[16.5px] leading-relaxed text-ink/70">
              C&apos;est ainsi qu&apos;est né notre food truck. Inspiré par ces instants
              du quotidien, avec l&apos;envie de proposer des glaces artisanales
              de qualité, des crêpes gourmandes et des gaufres généreuses —
              le tout dans un esprit familial et convivial. Aujourd&apos;hui, on
              est heureux de vous accueillir au bord de la Seine, pour
              partager bien plus qu&apos;une pause sucrée&nbsp;: un vrai moment de
              plaisir.
            </p>
          </Reveal>
        </div>

        {/* Quote */}
        <Reveal>
          <div className="relative mx-auto mt-20 max-w-3xl px-6">
            <div className="relative rounded-[2rem] bg-cream p-10 shadow-soft">
              <Quote className="absolute -left-3 -top-3 h-10 w-10 rotate-180 text-sun-300" />
              <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                «&nbsp;On n&apos;a pas inventé la glace. On a juste voulu prolonger
                ces dimanches au bord de l&apos;eau, en famille.&nbsp;»
              </p>
              <p className="mt-4 font-script text-xl text-teal-700">
                Les trois amis fondateurs
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Side photos */}
      <section className="relative pb-24">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
              <Image
                src="/inprod.jpg"
                alt="En cuisine, préparation des crêpes"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
              <Image
                src="/camion.jpg"
                alt="La caravane sur le quai"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer call */}
      <section className="relative pb-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <Heart className="mx-auto h-6 w-6 text-cherry" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">
              Venez partager un moment au bord de l&apos;eau
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-ink/65">
              Le mieux, c'est encore de passer un dimanche après-midi
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/privatisation"
                className="btn-liquid group inline-flex items-center gap-2 rounded-full bg-cherry px-6 py-3.5 text-sm font-semibold text-cream shadow-soft hover:shadow-glow-cherry"
              >
                Privatiser le food truck
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-ink shadow-soft transition hover:bg-cream-deep"
              >
                Nous contacter
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
