import HeroImage from "../components/hero/Hero";
import FeatureCard from "../components/featureSection/featureSection";

import Auth from "../utils/auth";

function Home() {
  return (
    <div>
      <HeroImage />
      <FeatureCard />
    </div>
  );
}

export default Home;
