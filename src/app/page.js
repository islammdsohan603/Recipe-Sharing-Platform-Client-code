import Banner from "@/component/homepage/Banner";
import Community from "@/component/share/community";
import SeasonalHarvestCard from "@/component/share/SeasonalHarvestCard";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <SeasonalHarvestCard />
      <Community />
    </div>
  )
}
