import type { Metadata } from "next";
import { Menu } from "@/components/Menu";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { SectionBanner } from "@/components/SectionBanner";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Mairie+de+La+Frette-sur-Seine+95530";

export const metadata: Metadata = {
  title: "Menu — glaces, crêpes & gaufres artisanales",
  description:
    "Découvrez la carte Glaces en Seine : glaces artisanales, crêpes et gaufres préparées chaque matin à La Frette-sur-Seine. Ouvert sam·dim·fériés de 14h à 19h, mai → septembre.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <div className="overflow-x-hidden">
      <SectionBanner>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-teal-400">
          Menu
        </p>
        <h1 className="h-display text-3xl text-cream drop-shadow-sm sm:text-4xl lg:text-5xl">
          Trois douceurs,{" "}
          <span className="font-script text-sun-300">artisanales</span>
        </h1>
        <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-cream/80 drop-shadow-sm sm:text-[15px]">
          Pâte à crêpe du matin, glaces turbinées sur place, gaufres sorties
          du fer — tout est préparé devant vous.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[12.5px]">
          <span className="flex items-center gap-1.5 rounded-full bg-cream/15 px-4 py-1.5 text-cream/85 backdrop-blur">
            <Clock className="h-3 w-3 text-teal-400" /> Sam · Dim · Fériés · 14h–19h
          </span>
          <Link
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-cherry/80 px-4 py-1.5 font-semibold text-cream transition hover:bg-cherry"
          >
            <MapPin className="h-3 w-3" /> La Frette-sur-Seine
          </Link>
        </div>
      </SectionBanner>

      <Menu />

      <div className="py-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink shadow-soft transition hover:shadow-ring"
        >
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
