import Image from "next/image";

export function SectionBanner({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight: "200px", aspectRatio: "21/7" }}
    >
      <Image
        src="/bannerforsection.png"
        alt="Glaces en Seine — glaces, crêpes & gaufres artisanales sur les quais de Seine"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* left-to-right reading overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/45 to-ink/10" />
      {/* bottom fade for depth */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent" />

      {children && (
        <div className="relative flex h-full flex-col justify-center px-6 py-8 sm:px-12 lg:px-20">
          {children}
        </div>
      )}
    </div>
  );
}
