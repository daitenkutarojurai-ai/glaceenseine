import Image from "next/image";
import Link from "next/link";
import { ArrowRight, IceCream, Cookie, CakeSlice } from "lucide-react";
import { WeeklyPollCard } from "./WeeklyPoll";

const PILLS = [
  { icon: IceCream, label: "Glaces artisanales", color: "bg-rose-100 text-cherry" },
  { icon: Cookie,   label: "Crêpes",               color: "bg-sun-100 text-ink" },
  { icon: CakeSlice,label: "Gaufres",               color: "bg-teal-100 text-teal-700" },
];

const MENU_SRC = "/menu2.jpg";

export function MenuBanner() {
  return (
    <section
      id="menu"
      className="scroll-mt-20 py-10 sm:py-16"
      aria-label="Notre carte"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-4 sm:mb-5">
          <div>
            <p className="eyebrow">La carte</p>
            <h2 className="h-display mt-1 text-2xl sm:text-3xl">
              Trois douceurs,{" "}
              <span className="font-script text-cherry">une caravane</span>.
            </h2>
          </div>
          <Link
            href="/menu"
            className="group hidden shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream shadow-soft transition hover:shadow-glow-cherry sm:inline-flex"
          >
            Voir tout
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <Link href="/menu" className="group block" aria-label="Voir la carte Glaces en Seine">
          <div className="relative overflow-hidden rounded-3xl shadow-soft">
            <div className="relative aspect-[3/2] w-full sm:aspect-[21/6]">
              <Image
                src={MENU_SRC}
                alt="Carte Glaces en Seine — glaces, crêpes et gaufres artisanales sur les quais de Seine"
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                style={{ objectPosition: "50% 50%" }}
              />
            </div>
          </div>
        </Link>

        {/* Mobile pills + CTA */}
        <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
          {PILLS.map((p) => (
            <span
              key={p.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold shadow-soft ${p.color}`}
            >
              <p.icon className="h-3.5 w-3.5" />
              {p.label}
            </span>
          ))}
        </div>
        <div className="mt-3 sm:hidden">
          <Link
            href="/menu"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 text-sm font-semibold text-cream shadow-soft"
          >
            Voir la carte complète
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Poll — contextuellement lié au menu */}
        <div className="mt-4">
          <WeeklyPollCard />
        </div>
      </div>
    </section>
  );
}
