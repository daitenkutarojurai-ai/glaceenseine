import Image from "next/image";

interface SectionBannerProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
}

/**
 * Page hero banner. Single layout for every viewport:
 *   • image fills the section as a background
 *   • text content sits in a contained dark card at the bottom-left, so we
 *     never get a full-width "bandeau" cutting across the screen
 *   • container grows with content, so headings/buttons can't overflow
 */
export function SectionBanner({
  src = "/bannnersmall.png",
  alt = "Glaces en Seine — glaces, crêpes & gaufres artisanales sur les quais de Seine",
  children,
}: SectionBannerProps) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-ink">
      {/* Background image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        quality={92}
        className="absolute inset-0 -z-10 object-cover object-center"
      />
      {/* Subtle global tint so light parts of the image don't blow out the
          contained text card edges. Kept very light so it doesn't read as a
          dark band across the screen. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-ink/15"
      />

      {children ? (
        <div className="relative flex min-h-[360px] flex-col justify-end px-5 pb-8 pt-14 sm:min-h-[440px] sm:px-12 sm:pb-12 sm:pt-20 lg:px-20">
          <div className="max-w-2xl rounded-2xl bg-ink/70 px-5 py-5 ring-1 ring-cream/10 sm:px-7 sm:py-6">
            {children}
          </div>
        </div>
      ) : (
        <div className="h-[360px] sm:h-[440px]" />
      )}
    </section>
  );
}
