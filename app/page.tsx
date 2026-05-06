import { HeroCarousel } from "@/components/HeroCarousel";
import { MenuBanner } from "@/components/MenuBanner";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { PrivatisationTeaser } from "@/components/PrivatisationTeaser";
import { Location } from "@/components/Location";
import { Newsletter } from "@/components/Newsletter";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quels jours est ouvert Glaces en Seine ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glaces en Seine est ouvert le samedi, le dimanche et les jours fériés, de 14h à 19h, de mai à septembre. La caravane est fermée du lundi au vendredi.",
      },
    },
    {
      "@type": "Question",
      name: "Où trouver la caravane Glaces en Seine ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sur le Quai de Seine, face à la mairie de La Frette-sur-Seine (95530, Val-d'Oise). Accès en train via la SNCF Ligne J (gare de La Frette-Montigny) ou par la véloroute des bords de Seine.",
      },
    },
    {
      "@type": "Question",
      name: "Que sert Glaces en Seine ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glaces artisanales (boules au choix, saveur spéciale chaque semaine), crêpes sucrées, gaufres maison et boissons fraîches ou chaudes. La signature de la maison est La Foli's : gaufre, chantilly et cubes croustillants.",
      },
    },
    {
      "@type": "Question",
      name: "Peut-on privatiser la caravane pour un événement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, la caravane Glaces en Seine se déplace en Île-de-France pour mariages, anniversaires, séminaires et fêtes de quartier. Devis gratuit sous 24 h via la page Privatisation.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le prix moyen ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Carte indicative : crêpe sucre cristal 2,50 € · une boule 3,50 € · pâte à tartiner ou caramel 3,50 € à 4,50 € · gaufre signature La Foli's 7,50 € · café 2 € · soft 33 cl 2,50 €.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <HeroCarousel />
      <MenuBanner />
      <Gallery />
      <Testimonials />
      <PrivatisationTeaser />
      <Location />

      <Newsletter />
    </>
  );
}
