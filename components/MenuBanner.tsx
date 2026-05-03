import { IceCream, Cookie, CakeSlice } from "lucide-react";
import { WeeklyPollCard } from "./WeeklyPoll";
import { MenuLightbox } from "./MenuLightbox";

const PILLS = [
  { icon: IceCream, label: "Glaces artisanales", color: "bg-rose-100 text-cherry" },
  { icon: Cookie,   label: "Crêpes",               color: "bg-sun-100 text-ink" },
  { icon: CakeSlice,label: "Gaufres",               color: "bg-teal-100 text-teal-700" },
];

const MENU_SRC = "/menu2.jpg";
// TODO: swap back to "/claseephoneupdate.png" once the asset is added to /public.
const MENU_ZOOM_SRC = "/menu2.jpg";

export function MenuBanner() {
  return (
    <section
      id="menu"
      className="scroll-mt-20 py-8 sm:py-12"
      aria-label="Notre carte"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-4 sm:mb-5">
          <p className="eyebrow">La carte</p>
          <h2 className="h-display mt-1 text-2xl sm:text-3xl">
            Trois douceurs,{" "}
            <span className="font-script text-cherry">une caravane</span>.
          </h2>
        </div>

        <MenuLightbox
          previewSrc={MENU_SRC}
          zoomSrc={MENU_ZOOM_SRC}
          alt="Carte Glaces en Seine — glaces, crêpes et gaufres artisanales sur les quais de Seine"
        />

        {/* Mobile pills */}
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

        {/* Poll — contextuellement lié au menu */}
        <div className="mt-4">
          <WeeklyPollCard />
        </div>
      </div>
    </section>
  );
}
