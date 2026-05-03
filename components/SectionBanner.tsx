import Image from "next/image";

interface SectionBannerProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
}

export function SectionBanner({
  src = "/bannnersmall.png",
  alt = "Glaces en Seine — glaces, crêpes & gaufres artisanales sur les quais de Seine",
  children,
}: SectionBannerProps) {
  return (
    <div className="w-full bg-ink">
      {/* Image strip — compact on mobile, wide cinematic ratio on desktop */}
      <div className="relative isolate w-full overflow-hidden bg-ink aspect-[16/9] min-h-[160px] sm:aspect-[23/5] sm:min-h-[180px]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          quality={92}
          className="object-cover object-center"
        />
        {/* Reading overlay — only meaningful when content is laid over the image (≥ sm). */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-ink/65 via-ink/35 to-transparent sm:block" />

        {/* Desktop / tablet: content overlaid on the image */}
        {children && (
          <div className="relative hidden h-full flex-col justify-center px-6 py-8 sm:flex sm:px-12 lg:px-20">
            {children}
          </div>
        )}
      </div>

      {/* Mobile: same content rendered below the image, in a dark card so the
          original cream-on-dark child styling stays legible. Buttons can wrap
          freely without spilling out of a fixed-height banner. */}
      {children && (
        <div className="block bg-ink px-5 pb-7 pt-5 sm:hidden">
          {children}
        </div>
      )}
    </div>
  );
}
