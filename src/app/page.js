import Banner from "@/component/homepage/Banner";
import FeaturedScetion from "@/component/homepage/FeaturedScetion";
import PopularRecipe from "@/component/homepage/PopularRecipe";

import SeasonalHarvestCard from "@/component/homepage/SeasonalHarvestCard";
import Community from "@/component/homepage/community";
import Footer from "@/component/share/Footer";



export default function Home() {
  return (
    <div>

      <Banner />
      <PopularRecipe />
      <FeaturedScetion />
      <SeasonalHarvestCard />
      <Community />

    </div>
  )
}
