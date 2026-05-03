import Image from "next/image";

export function SectionBanner() {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full" style={{ aspectRatio: "21/4" }}>
        <Image
          src="/bannerforsection.png"
          alt="Glaces en Seine — glaces, crêpes & gaufres artisanales sur les quais de Seine"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
