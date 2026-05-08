import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Glaces en Seine — Glaces, crêpes & gaufres sur les quais de Seine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const heroData = readFileSync(join(process.cwd(), "public", "glaceensein1.png"));
  const heroSrc = `data:image/png;base64,${heroData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          width={1200}
          height={630}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    ),
    { ...size },
  );
}
