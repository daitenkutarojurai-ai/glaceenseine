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
    <div
      className="relative isolate w-full overflow-hidden bg-ink"
      style={{ minHeight: "200px", aspectRatio: "21/7" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-center"
      />
      {/* Left-to-right reading overlay so text stays legible.
          Stops short of the bottom edge to avoid a visible dark line where
          the banner meets the next section. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/65 via-ink/35 to-transparent" />

      {children && (
        <div className="relative flex h-full flex-col justify-center px-6 py-8 sm:px-12 lg:px-20">
          {children}
        </div>
      )}
    </div>
  );
}
