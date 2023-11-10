import styles from "./css/FeatureCard.module.css";

const FeatureCard = ({ number, title, text }) => (
  <div className={styles.card}>
    <div className={styles.cardNumber}>{number}</div>
    <div className={styles.cardContent}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{text}</p>
    </div>
  </div>
);

export default FeatureCard;
