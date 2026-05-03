import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Glaces en Seine — Glaces, crêpes & gaufres artisanales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const logoData = readFileSync(join(process.cwd(), "public", "logo.jpg"));
  const logoSrc = `data:image/jpeg;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFFBF1",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={260}
          height={198}
          alt="Logo Glaces en Seine"
          style={{ objectFit: "contain", borderRadius: 16 }}
        />
        {/* Tagline */}
        <p
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#2D2918",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          Glaces en Seine
        </p>
        <p
          style={{
            fontSize: 20,
            color: "#5A5040",
            margin: 0,
          }}
        >
          Glaces · Crêpes · Gaufres artisanales
        </p>
        <p
          style={{
            fontSize: 16,
            color: "#8A7A60",
            margin: 0,
            marginTop: 4,
          }}
        >
          La Frette-sur-Seine · Sam · Dim · Fériés · 14h–19h
        </p>
      </div>
    ),
    { ...size },
  );
}
