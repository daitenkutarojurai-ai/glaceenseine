import { HeroCarousel } from "@/components/HeroCarousel";
import { MenuBanner } from "@/components/MenuBanner";
import { WeeklyPoll } from "@/components/WeeklyPoll";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { PrivatisationTeaser } from "@/components/PrivatisationTeaser";
import { Location } from "@/components/Location";
import { Newsletter } from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <MenuBanner />
      <WeeklyPoll />
      <Gallery />
      <Testimonials />
      <PrivatisationTeaser />
      <Location />
      <Newsletter />
    </>
  );
}
