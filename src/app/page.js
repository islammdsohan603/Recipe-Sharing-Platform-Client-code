import Banner from "@/component/homepage/Banner";

import SeasonalHarvestCard from "@/component/homepage/SeasonalHarvestCard";
import Community from "@/component/share/community";
import Footer from "@/component/share/Footer";



export default function Home() {
  return (
    <div>

      <Banner />
      <SeasonalHarvestCard />
      <Community />
      <Footer />
    </div>
  )
}
