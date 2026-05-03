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
    images: [{ url: "/imagecarrousel.png", width: 1200, height: 630, alt: "Glaces en Seine" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFBF1",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "Glaces en Seine",
  description: "Glacier artisanal sur les quais de Seine — glaces, crêpes & gaufres faites maison.",
  url: "https://glaceenseine.fr",
  servesCuisine: ["Desserts", "Glaces artisanales", "Crêpes", "Gaufres"],
  priceRange: "€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Quai de Seine, face à la mairie",
    addressLocality: "La Frette-sur-Seine",
    postalCode: "95530",
    addressCountry: "FR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 48.9843, longitude: 2.1836 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday", "PublicHolidays"], opens: "14:00", closes: "19:00" },
  ],
  sameAs: ["https://instagram.com/glacesenseine"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">
        <AnnouncementBar />
        <Nav />
        <main className="relative w-full overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
