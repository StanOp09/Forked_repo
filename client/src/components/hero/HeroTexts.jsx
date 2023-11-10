import styles from "./Hero.module.css";

const HeroText = () => {
  return (
    <div className={styles.heroTextContainer}>
      <div className={styles.subtitle}>EXPERT AI ARTICLE WRITING SERVICE</div>
      <h1 className={styles.title}>
        SAY GOODBYE TO WRITER'S BLOCK AND HELLO TO QUALITY CONTENT
      </h1>
    </div>
  );
};

export default HeroText;
