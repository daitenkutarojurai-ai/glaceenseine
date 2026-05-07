import type { Metadata } from "next";
import { Menu } from "@/components/Menu";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionBanner } from "@/components/SectionBanner";
import { MenuLightbox } from "@/components/MenuLightbox";

export const metadata: Metadata = {
  title: "Menu — glaces, crêpes & gaufres artisanales",
  description:
    "Découvrez la carte Glaces en Seine : glaces artisanales, crêpes et gaufres préparées chaque matin à La Frette-sur-Seine. Ouvert sam·dim·fériés de 14h à 19h, mai → septembre.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu — Glaces en Seine",
    description: "Glaces artisanales, crêpes et gaufres préparées sur les quais de Seine, à La Frette-sur-Seine (95).",
    url: "https://glaceenseine.fr/menu",
    images: [{ url: "/newmenu.png", width: 1200, height: 630, alt: "Carte Glaces en Seine" }],
  },
};

export default function MenuPage() {
  return (
    <div className="overflow-x-hidden">
      <SectionBanner src="/bannersmalllast.png" alt="Glaces en Seine — la carte glaces, crêpes et gaufres">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300 drop-shadow">
          Menu
        </p>
        <h1 className="h-display text-3xl text-cream drop-shadow-md sm:text-4xl lg:text-5xl">
          Trois douceurs,{" "}
          <span className="font-script text-sun-300">artisanales</span>
        </h1>
        <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-cream/95 drop-shadow sm:text-[15px]">
          Pâte à crêpe du matin, glaces turbinées sur place, gaufres sorties
          du fer. Tout est préparé devant vous.
        </p>
      </SectionBanner>

      <Menu />

      <section
        aria-label="Carte Glaces en Seine — vue complète"
        className="mx-auto max-w-5xl px-4 py-10 sm:px-6"
      >
        <MenuLightbox
          previewSrc="/newmenu.png"
          zoomSrc="/careupdate.png"
          alt="Carte Glaces en Seine — glaces, crêpes et gaufres artisanales"
        />
      </section>

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
