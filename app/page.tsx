import { HeroCarousel } from "@/components/HeroCarousel";
import { MenuBanner } from "@/components/MenuBanner";
import { Gallery } from "@/components/Gallery";
import { PrivatisationTeaser } from "@/components/PrivatisationTeaser";
import { Location } from "@/components/Location";
import { Newsletter } from "@/components/Newsletter";
import { WeeklyPollCard } from "@/components/WeeklyPoll";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <MenuBanner />
      <Gallery />
      <PrivatisationTeaser />
      <Location />
      <div className="mx-auto max-w-5xl px-4 pb-4 sm:px-6">
        <WeeklyPollCard />
      </div>
      <Newsletter />
    </>
  );
}
