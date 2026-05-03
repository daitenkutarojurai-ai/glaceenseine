import { HeroCarousel } from "@/components/HeroCarousel";
import { MenuBanner } from "@/components/MenuBanner";
import { Gallery } from "@/components/Gallery";
import { PrivatisationTeaser } from "@/components/PrivatisationTeaser";
import { Location } from "@/components/Location";
import { Newsletter } from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <MenuBanner />
      <Gallery />
      <PrivatisationTeaser />
      <Location />
      <Newsletter />
    </>
  );
}
