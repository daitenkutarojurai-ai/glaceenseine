import Image from "next/image";

interface SectionBannerProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
}

/**
 * Page hero banner. Single layout for every viewport:
 *   • image fills the full section (object-cover)
 *   • strong bottom-heavy dark scrim guarantees text contrast
 *   • children sit at the bottom-left and the section grows with content,
 *     so headings/buttons never overflow the image box on phones
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
      {/* Dark scrim — heavy at the bottom (where text lands), softer at top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/25"
      />

      {children ? (
        <div className="relative flex min-h-[380px] flex-col justify-end px-5 pb-10 pt-16 sm:min-h-[460px] sm:px-12 sm:pb-14 sm:pt-24 lg:px-20">
          {children}
        </div>
      ) : (
        <div className="aspect-[16/9] min-h-[180px] sm:aspect-[23/5] sm:min-h-[200px]" />
      )}
    </section>
  );
}
