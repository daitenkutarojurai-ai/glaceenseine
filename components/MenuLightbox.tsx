import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";

interface MenuLightboxProps {
  previewSrc: string;
  /** Image opened in a new tab when the preview (or CTA button) is clicked. */
  zoomSrc: string;
  alt: string;
  /** Tailwind aspect ratio class for the inline preview frame. */
  previewAspect?: string;
  className?: string;
}

export function MenuLightbox({
  previewSrc,
  zoomSrc,
  alt,
  previewAspect = "aspect-[16/9]",
  className = "",
}: MenuLightboxProps) {
  return (
    <div className={`w-full ${className}`}>
      <a
        href={zoomSrc}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ouvrir la carte complète Glaces en Seine dans un nouvel onglet"
        className="group relative block w-full cursor-pointer overflow-hidden rounded-3xl bg-cream shadow-soft transition hover:shadow-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry focus-visible:ring-offset-2"
      >
        <div className={`relative w-full ${previewAspect}`}>
          <Image
            src={previewSrc}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            quality={92}
            className="object-contain transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
        {/* Subtle bottom gradient so the pill always reads against any image */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/50 to-transparent" />
        {/* External-link cue */}
        <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-[11.5px] font-semibold text-cream shadow-soft backdrop-blur">
          <ExternalLink className="h-3.5 w-3.5" />
          Nouvel onglet
        </span>
      </a>

      {/* Explicit CTA button — the previous "Agrandir" pill alone wasn't enough
          to make the click affordance obvious, especially on mobile. */}
      <a
        href={zoomSrc}
        target="_blank"
        rel="noopener noreferrer"
        className="group/cta mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13.5px] font-semibold text-cream shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow"
      >
        Voir la carte complète
        <ArrowUpRight className="h-4 w-4 transition group-hover/cta:translate-x-0.5" />
      </a>
    </div>
  );
}
