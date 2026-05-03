import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  title: "Glaces en Seine — Glaces, crêpes & gaufres sur les quais",
  description:
    "Glacier artisanal sur les quais de Seine à La Frette-sur-Seine. Glaces, crêpes & gaufres faites maison. Ouvert weekends & jours fériés, 14h–19h, de mai à septembre.",
  metadataBase: new URL("https://glaceenseine.fr"),
  openGraph: {
    title: "Glaces en Seine",
    description: "La gourmandise débarque sur les quais de Seine.",
    locale: "fr_FR",
    type: "website",
    images: ["/bannerup.png"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFBF1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`} style={{ overflowX: "hidden" }}>
      <body className="font-sans" style={{ overflowX: "hidden" }}>
        <AnnouncementBar />
        <Nav />
        <main className="w-full overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
