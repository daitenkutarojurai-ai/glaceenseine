import { HeroCarousel } from "@/components/HeroCarousel";
import { Menu } from "@/components/Menu";
import { Poll } from "@/components/Poll";
import { PrivatisationTeaser } from "@/components/PrivatisationTeaser";
import { Newsletter } from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Menu />
      <Poll />
      <PrivatisationTeaser />
      <Newsletter />
    </>
  );
}
