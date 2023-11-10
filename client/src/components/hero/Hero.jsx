import { useFetchImage } from "../../utils/imageFetch";
import styles from "./Hero.module.css";
import HeroTexts from "./HeroTexts";

const HeroImage = () => {
  const { imageUrl, loading, error } = useFetchImage("write-away-hero.png");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading image: {error.message}</p>;

  return (
    <div
      className={styles.heroImage}
      style={{ backgroundImage: `url(${imageUrl})` }}
      aria-label="Hero Image"
    >
      <HeroTexts />
    </div>
  );
};

export default HeroImage;
