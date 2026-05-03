import type { Metadata } from "next";
import { Menu } from "@/components/Menu";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Clock } from "lucide-react";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Mairie+de+La+Frette-sur-Seine+95530";

export const metadata: Metadata = {
  title: "La carte — Glaces en Seine",
  description:
    "Toutes nos glaces artisanales, crêpes et gaufres. Préparées chaque matin à La Frette-sur-Seine, ouvert sam·dim·fériés de 14h à 19h.",
};

export default function MenuPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero banner */}
      <div className="relative overflow-hidden bg-ink pb-16 pt-14 text-center text-cream">
        <Image
          src="/menu2.jpg"
          alt="La carte Glaces en Seine"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/80" />
        <div className="relative mx-auto max-w-2xl px-4">
          <Reveal>
            <p className="eyebrow text-teal-400">La carte</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="h-display mt-2 text-4xl text-cream sm:text-5xl">
              Trois douceurs,{" "}
              <span className="font-script text-sun-300">faites maison</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-[15px] leading-relaxed text-cream/65">
              Pâte à crêpe du matin, glaces turbinées sur place, gaufres sorties
              du fer — tout est préparé devant vous.
            </p>
          </Reveal>
          {/* Info chips */}
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-[13px]">
              <span className="flex items-center gap-1.5 rounded-full bg-cream/10 px-4 py-2 text-cream/80 backdrop-blur">
                <Clock className="h-3.5 w-3.5 text-teal-400" />Sam · Dim · Fériés · 14h–19h
              </span>
              <Link href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-cherry/80 px-4 py-2 font-semibold text-cream transition hover:bg-cherry">
                <MapPin className="h-3.5 w-3.5" />La Frette-sur-Seine
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Menu component */}
      <Menu />

      {/* Back CTA */}
      <div className="py-10 text-center">
        <Link href="/"
          className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink shadow-soft transition hover:shadow-ring">
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
