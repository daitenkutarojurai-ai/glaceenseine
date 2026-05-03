import { HeroCarousel } from "@/components/HeroCarousel";
import { MenuBanner } from "@/components/MenuBanner";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <MenuBanner />
      <Gallery />
      <Testimonials />
      <Newsletter />
    </>
  );
}
