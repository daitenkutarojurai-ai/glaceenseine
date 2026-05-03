import Image from "next/image";
import { ZoomIn } from "lucide-react";

interface MenuLightboxProps {
  previewSrc: string;
  /** Image opened in a new tab when the preview is clicked. */
  zoomSrc: string;
  alt: string;
  /** Tailwind aspect ratio class for the inline preview frame. */
  previewAspect?: string;
  /** Whether to show the round "Agrandir" pill in the top-right of the preview. */
  showZoomPill?: boolean;
  className?: string;
}

export function MenuLightbox({
  previewSrc,
  zoomSrc,
  alt,
  previewAspect = "aspect-[16/9]",
  showZoomPill = true,
  className = "",
}: MenuLightboxProps) {
  return (
    <a
      href={zoomSrc}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ouvrir la carte Glaces en Seine en grand dans un nouvel onglet"
      className={`group block w-full cursor-zoom-in text-left ${className}`}
    >
      <div className="relative overflow-hidden rounded-3xl bg-cream shadow-soft transition group-hover:shadow-ring">
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
        {showZoomPill && (
          <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-[11.5px] font-semibold text-cream shadow-soft backdrop-blur">
            <ZoomIn className="h-3.5 w-3.5" />
            Agrandir
          </span>
        )}
      </div>
    </a>
  );
}
