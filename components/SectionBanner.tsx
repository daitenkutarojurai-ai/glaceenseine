import Image from "next/image";

interface SectionBannerProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
}

export function SectionBanner({
  src = "/bannerforsection.png",
  alt = "Glaces en Seine — glaces, crêpes & gaufres artisanales sur les quais de Seine",
  children,
}: SectionBannerProps) {
  return (
    <div
      className="relative w-full overflow-hidden bg-ink"
      style={{ minHeight: "200px", aspectRatio: "21/7" }}
    >
      {/* Blurred ambient fill — covers any letterbox bands */}
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        quality={60}
        className="object-cover scale-110 opacity-45"
        style={{ filter: "blur(20px)" }}
      />
      {/* Sharp cover image — slightly cropped to fit banner ratio */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        quality={88}
        className="object-cover object-center"
      />
      {/* Left-to-right reading overlay so text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/45 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent" />

      {children && (
        <div className="relative flex h-full flex-col justify-center px-6 py-8 sm:px-12 lg:px-20">
          {children}
        </div>
      )}
    </div>
  );
}
