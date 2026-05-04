import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const PARAGRAPHS = [
  "Tout a commencé au bord des quais de Seine. Trois amis, voisins et parents, habitués à se retrouver pour de longues balades avec leurs enfants — rires, goûters improvisés, moments partagés au fil de l’eau.",
  "Un jour, en regardant les enfants savourer une glace au soleil, l’idée a germé : pourquoi ne pas créer un endroit gourmand, simple et authentique, qui rassemble petits et grands dans cette ambiance qu’on aime tant ?",
  "C’est ainsi qu’est né notre food truck. Un projet de cœur, pour proposer des glaces artisanales de qualité, des crêpes gourmandes et des gaufres généreuses — le tout dans un esprit familial et convivial.",
];

export function StoryTeaser() {
  return (
    <section
      id="notre-histoire"
      className="scroll-mt-20 py-16 sm:py-24"
      aria-labelledby="story-teaser-title"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">

          {/* Image */}
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
              <Image
                src="/camion-patronne.jpg"
                alt="La caravane Glaces en Seine sur les quais de La Frette-sur-Seine"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <Reveal>
              <p className="eyebrow">Notre histoire</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="story-teaser-title"
                className="h-display mt-2 text-3xl sm:text-4xl"
              >
                Tout a commencé{" "}
                <span className="font-script text-cherry">au bord de l&apos;eau</span>.
              </h2>
            </Reveal>

            <div className="mt-5 space-y-4">
              {PARAGRAPHS.map((p, i) => (
                <Reveal key={i} delay={0.07 + i * 0.05}>
                  <p className="text-[15.5px] leading-relaxed text-ink/70">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.22}>
              <blockquote className="mt-7 border-l-2 border-cherry/30 pl-4">
                <p className="font-script text-xl text-teal-700">
                  «&nbsp;Aujourd&apos;hui, on est heureux de vous accueillir ici, pour partager bien plus qu&apos;une pause sucrée.&nbsp;»
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.27}>
              <Link
                href="/notre-histoire"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13.5px] font-semibold text-cream shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                Lire notre histoire
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
