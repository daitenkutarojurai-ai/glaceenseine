import Link from "next/link";
import { Instagram, Facebook, Star } from "lucide-react";
import { SOCIAL } from "@/lib/social";

type Props = {
  /** Optional override of the lead-in caption. */
  title?: string;
  /** Optional override of the sub-line below the title. */
  subtitle?: string;
};

/**
 * Compact "Suivez-nous" band — three colored social pills.
 * Designed to slip between two existing sections without competing for
 * attention. Single ~120 px tall band on a cream-deep background.
 */
export function SocialStrip({
  title = "Suivez-nous sur le quai",
  subtitle = "Photos du jour, parfums de la semaine, météo du week-end.",
}: Props) {
  return (
    <section
      aria-label="Suivez Glaces en Seine sur les réseaux"
      className="bg-cream-deep py-10"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 text-center">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
            #glaceenseine
          </div>
          <h2 className="mt-1 font-script text-2xl text-ink sm:text-3xl">
            {title}
          </h2>
          <p className="mt-1 text-sm text-ink/65">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={SOCIAL.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${SOCIAL.instagram.handle}`}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:brightness-110"
          >
            <Instagram className="h-4 w-4" />
            Instagram
          </Link>
          <Link
            href={SOCIAL.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Glace en Seine"
            className="group inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:brightness-110"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </Link>
          <Link
            href={SOCIAL.google.review}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Laisser un avis Google"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:ring-sun-300"
          >
            <Star className="h-4 w-4 fill-sun-300 text-sun-300" />
            Avis Google
          </Link>
        </div>
      </div>
    </section>
  );
}
