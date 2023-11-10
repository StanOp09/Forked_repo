const Card = ({ data }) => {
  return (
    <div className={styles.card}>
      <h3>{data.title}</h3>
      {/* Display more content as needed */}
    </div>
  );
};
