import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { ScrollChrome } from "@/components/ScrollChrome";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Glaces en Seine — Glaces, crêpes & gaufres sur les quais",
    template: "%s · Glaces en Seine",
  },
  description:
    "Caravane gourmande sur les quais de Seine à La Frette-sur-Seine (95). Glaces, crêpes & gaufres à emporter. Ouvert sam·dim·fériés 15h–18h, de mai à septembre.",
  metadataBase: new URL("https://glaceenseine.fr"),
  alternates: { canonical: "/" },
  keywords: [
    "caravane gourmande",
    "La Frette-sur-Seine",
    "Cormeilles-en-Parisis",
    "Val-d'Oise",
    "95530",
    "crêpes",
    "gaufres",
    "glaces",
    "quai de Seine",
    "food truck",
    "glacier ambulant",
    "privatisation événement",
  ],
  authors: [{ name: "Glaces en Seine" }],
  creator: "Glaces en Seine",
  publisher: "Glaces en Seine",
  category: "food",
  openGraph: {
    title: "Glaces en Seine — Glaces, crêpes & gaufres sur les quais",
    description: "Caravane gourmande sur les quais de Seine, entre La Frette-sur-Seine et Cormeilles-en-Parisis.",
    url: "https://glaceenseine.fr",
    siteName: "Glaces en Seine",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/glaceensein1.png", width: 1200, height: 630, alt: "Glaces en Seine — caravane gourmande sur les quais" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glaces en Seine",
    description: "La gourmandise débarque sur les quais de Seine.",
    images: ["/glaceensein1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFBF1",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["FoodTruck", "IceCreamShop", "FoodEstablishment", "LocalBusiness"],
      "@id": "https://glaceenseine.fr/#business",
      name: "Glaces en Seine",
      alternateName: "Glaces en Seine — La Frette-sur-Seine",
      description:
        "Caravane gourmande à La Frette-sur-Seine (95530). Glaces, crêpes et gaufres servies sur les quais de Seine, sam·dim·fériés de 15h à 18h, mai → septembre.",
      url: "https://glaceenseine.fr",
      image: [
        "https://glaceenseine.fr/glaceensein1.png",
        "https://glaceenseine.fr/logo.jpg",
        "https://glaceenseine.fr/camion.jpg",
        "https://glaceenseine.fr/carrouselfinal.png",
      ],
      logo: "https://glaceenseine.fr/logo.jpg",
      servesCuisine: ["Desserts", "Glaces", "Crêpes", "Gaufres"],
      priceRange: "€",
      currenciesAccepted: "EUR",
      paymentAccepted: ["Cash", "Credit Card"],
      acceptsReservations: false,
      hasMenu: "https://glaceenseine.fr/menu",
      knowsLanguage: ["fr-FR"],
      areaServed: [
        { "@type": "City", name: "La Frette-sur-Seine" },
        { "@type": "City", name: "Cormeilles-en-Parisis" },
        { "@type": "City", name: "Herblay-sur-Seine" },
        { "@type": "AdministrativeArea", name: "Val-d'Oise" },
        { "@type": "AdministrativeArea", name: "Île-de-France" },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Quai de Seine, face à la mairie",
        addressLocality: "La Frette-sur-Seine",
        postalCode: "95530",
        addressRegion: "Val-d'Oise",
        addressCountry: "FR",
      },
      geo: { "@type": "GeoCoordinates", latitude: 48.9843, longitude: 2.1836 },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday", "PublicHolidays"], opens: "14:00", closes: "19:00" },
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          url: "https://glaceenseine.fr/contact",
          availableLanguage: ["French"],
        },
      ],
      sameAs: [
        "https://www.instagram.com/glaceenseine",
        "https://www.facebook.com/profile.php?id=61589342042525",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://glaceenseine.fr/#website",
      url: "https://glaceenseine.fr",
      name: "Glaces en Seine",
      inLanguage: "fr-FR",
      publisher: { "@id": "https://glaceenseine.fr/#business" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">
        <ScrollChrome />
        <AnnouncementBar />
        <Nav />
        <main className="relative w-full overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
