import styles from "./css/Subtitle.module.css";

const Subtitle = ({ text }) => (
  <div className={styles.subtitleContainer}>
    <h2 className={styles.subtitleText}>{text}</h2>
    <div className={styles.subtitleUnderline} />
  </div>
);

export default Subtitle;
