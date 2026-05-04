import { HeroCarousel } from "@/components/HeroCarousel";
import { StoryTeaser } from "@/components/StoryTeaser";
import { MenuBanner } from "@/components/MenuBanner";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { PrivatisationTeaser } from "@/components/PrivatisationTeaser";
import { Location } from "@/components/Location";
import { Newsletter } from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <StoryTeaser />
      <MenuBanner />
      <Gallery />
      <Testimonials />
      <PrivatisationTeaser />
      <Location />

      <Newsletter />
    </>
  );
}
