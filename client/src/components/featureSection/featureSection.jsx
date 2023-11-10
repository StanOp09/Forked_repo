import Subtitle from "./Subtitle";
import FeatureCard from "./FeatureCard";
import styles from "./css/FeatureSection.module.css";

const FeatureSection = () => {
  const features = [
    {
      number: "01",
      title: "Effortless Article Generation",
      text: "Harness the power of GPT-4 to create high-quality, engaging articles in minutes. Our advanced AI understands context and tone, ensuring that your content resonates with your target audience.",
    },
    {
      number: "02",
      title: "SEO-Driven Approach",
      text: "Optimize your content for search engines with our integrated SEO tools. Get keyword suggestions, analyze competitor strategies, and track your rankings, all within the same platform.",
    },
    {
      number: "03",
      title: "Social Media Integration",
      text: "Seamlessly generate and schedule social media posts directly from your articles. Our platform supports various social media channels, ensuring your content reaches your audience wherever they are.",
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <Subtitle text="Saving you time so you can put more into where you’re needed most" />
      <div className={styles.cardsContainer}>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            number={feature.number}
            title={feature.title}
            text={feature.text}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
