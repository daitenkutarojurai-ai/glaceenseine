import { Hero } from "@/components/Hero";
import { TodaySpecial } from "@/components/TodaySpecial";
import { Concept } from "@/components/Concept";
import { Menu } from "@/components/Menu";
import { Experience } from "@/components/Experience";
import { Testimonials } from "@/components/Testimonials";
import { Poll } from "@/components/Poll";
import { Location } from "@/components/Location";
import { Schedule } from "@/components/Schedule";

export default function Home() {
  return (
    <>
      <Hero />
      <TodaySpecial />
      <Concept />
      <Menu />
      <Experience />
      <Testimonials />
      <Poll />
      <Location />
      <Schedule />
    </>
  );
}
