import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Heart, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Notre histoire — Glaces en Seine",
  description:
    "L'histoire de la caravane Glaces en Seine, posée chaque été sur les quais de La Frette-sur-Seine. Deux sœurs, une recette, et l'envie de ralentir le dimanche.",
};

export default function HistoirePage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pb-20 pt-16 sm:pt-24">
        <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-blob bg-gradient-sun opacity-50 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-40 h-[420px] w-[420px] rounded-blob bg-teal-100 opacity-60 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal>
            <p className="eyebrow">Notre histoire</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h-display mt-3 text-5xl sm:text-6xl">
              Une caravane,{" "}
              <span className="font-script text-cherry">deux sœurs</span>,
              <br />
              et le quai de Seine pour décor.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink/70">
              Glaces en Seine, c'est une vieille caravane vert tendre, deux
              sœurs qui aiment cuisiner, et une promesse simple : tout faire
              maison, le matin même, à deux pas de l'eau.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Hero photo */}
      <section className="relative">
        <Reveal>
          <div className="relative mx-auto aspect-[16/9] max-w-6xl overflow-hidden rounded-[2.5rem] shadow-ring sm:aspect-[21/9]">
            <Image
              src="/camion-patronne.jpg"
              alt="La caravane et ses fondatrices, sur les quais de la Seine"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Story columns */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2">
          <Reveal>
            <h2 className="h-display text-3xl">Le déclic</h2>
            <p className="mt-3 text-[16.5px] leading-relaxed text-ink/70">
              Tout commence un dimanche d'été où, faute de glacier ouvert le
              long du quai, on rentre déçues. On se dit : "et si on s'y
              mettait ?" L'idée traîne un hiver, prend forme au printemps. On
              chine une caravane, on la repeint en vert tendre, on la baptise
              <em className="font-display italic text-ink"> Glaces en Seine</em>.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h-display text-3xl">Le geste artisan</h2>
            <p className="mt-3 text-[16.5px] leading-relaxed text-ink/70">
              On bat la pâte à crêpes le matin, on monte la chantilly minute,
              on infuse la vanille la veille. Pas de poudre, pas de mix tout
              prêt — juste du lait, des œufs, du sucre, et des fruits qui
              viennent du Vexin quand la saison s'y prête.
            </p>
          </Reveal>
        </div>

        {/* Quote */}
        <Reveal>
          <div className="relative mx-auto mt-20 max-w-3xl px-6">
            <div className="relative rounded-[2rem] bg-cream p-10 shadow-soft">
              <Quote className="absolute -left-3 -top-3 h-10 w-10 rotate-180 text-sun-300" />
              <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                "On n'a pas inventé la glace. On a juste voulu rendre le
                dimanche un peu plus doux."
              </p>
              <p className="mt-4 font-script text-xl text-teal-700">
                Marion & Camille
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

      {/* Footer call */}
      <section className="relative pb-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <Heart className="mx-auto h-6 w-6 text-cherry" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">
              Venez pousser la porte verte.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-ink/65">
              Le mieux, c'est encore de passer un dimanche après-midi.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/#emplacement"
              className="btn-liquid group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream shadow-soft hover:shadow-glow"
            >
              Voir l'emplacement
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
