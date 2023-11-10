import styles from "./css/SubscriptionCard.module.css";

const SubscriptionCard = ({ plan, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.subscriptionCard} ${
        isSelected ? styles.selected : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{plan.planName}</h3>
        <p className={styles.cardPrice}>{plan.price}</p>
      </div>
      <ul className={styles.featuresList}>
        {plan.features.map((feature, index) => (
          <li key={index} className={styles.feature}>
            {feature}
          </li>
        ))}
      </ul>
      {/* <button className={styles.subscribeButton} onClick={handleSubscribeClick}>
        Subscribe
      </button> */}
    </div>
  );
};

export default SubscriptionCard;
