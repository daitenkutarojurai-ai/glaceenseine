"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";

interface MenuLightboxProps {
  previewSrc: string;
  zoomSrc: string;
  alt: string;
  /** Tailwind aspect ratio class for the inline preview frame. */
  previewAspect?: string;
  /** Whether to show the round "Agrandir" pill in the top-right of the preview. */
  showZoomPill?: boolean;
  /** Optional className for the outer button, e.g. shadow/rounding overrides. */
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
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  return (
    <>
      <button
        type="button"
        onClick={() => setZoomed(true)}
        className={`group block w-full cursor-zoom-in text-left ${className}`}
        aria-label="Agrandir la carte Glaces en Seine"
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
      </button>

      {zoomed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Carte Glaces en Seine — vue agrandie"
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-4 py-2 text-[12.5px] font-semibold text-ink shadow-soft transition hover:bg-cream sm:right-5 sm:top-5"
            aria-label="Fermer la vue agrandie"
          >
            <X className="h-4 w-4" />
            Fermer
          </button>
          <div
            className="relative h-full w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={zoomSrc}
              alt="Carte Glaces en Seine — vue agrandie"
              fill
              sizes="100vw"
              quality={95}
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
