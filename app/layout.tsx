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
    "Glacier artisanal sur les quais de Seine à La Frette-sur-Seine (95). Glaces, crêpes & gaufres préparées devant vous. Ouvert sam·dim·fériés 14h–19h, de mai à septembre.",
  metadataBase: new URL("https://glaceenseine.fr"),
  alternates: { canonical: "/" },
  keywords: [
    "glacier artisanal",
    "La Frette-sur-Seine",
    "Cormeilles-en-Parisis",
    "Val-d'Oise",
    "95530",
    "crêpes",
    "gaufres",
    "glaces artisanales",
    "quai de Seine",
    "food truck",
    "caravane gourmande",
    "privatisation événement",
  ],
  authors: [{ name: "Glaces en Seine" }],
  creator: "Glaces en Seine",
  publisher: "Glaces en Seine",
  category: "food",
  openGraph: {
    title: "Glaces en Seine — Glaces, crêpes & gaufres sur les quais",
    description: "Glacier artisanal sur les quais de Seine, entre La Frette-sur-Seine et Cormeilles-en-Parisis.",
    url: "https://glaceenseine.fr",
    siteName: "Glaces en Seine",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/logo.jpg", width: 496, height: 377, alt: "Logo Glaces en Seine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glaces en Seine",
    description: "La gourmandise débarque sur les quais de Seine.",
    images: ["/logo.jpg"],
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
      "@type": ["FoodEstablishment", "IceCreamShop", "LocalBusiness"],
      "@id": "https://glaceenseine.fr/#business",
      name: "Glaces en Seine",
      alternateName: "Glaces en Seine — La Frette-sur-Seine",
      description:
        "Glacier artisanal de quai à La Frette-sur-Seine (95530). Glaces, crêpes et gaufres préparées devant vous, sur les quais de Seine, sam·dim·fériés de 14h à 19h, mai → septembre.",
      url: "https://glaceenseine.fr",
      image: [
        "https://glaceenseine.fr/logo.jpg",
        "https://glaceenseine.fr/camion.jpg",
        "https://glaceenseine.fr/carrouselfinal.png",
      ],
      logo: "https://glaceenseine.fr/logo.jpg",
      servesCuisine: ["Desserts", "Glaces artisanales", "Crêpes", "Gaufres"],
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
        "https://instagram.com/glacesenseine",
        "https://www.facebook.com/glacesenseine",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://glaceenseine.fr/#website",
      url: "https://glaceenseine.fr",
      name: "Glaces en Seine",
      inLanguage: "fr-FR",
      publisher: { "@id": "https://glaceenseine.fr/#business" },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://glaceenseine.fr/menu?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
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
