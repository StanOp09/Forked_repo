const CardContainer = ({ title, type, cardsData }) => {
  const scrollContainer = useRef(null);

  const scrollToNextCard = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 200; // Adjust the scroll amount as needed
      const scroll = direction === "prev" ? -scrollAmount : scrollAmount;
      scrollContainer.current.scrollBy({ left: scroll, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.cardContainer}>
      <h2 className={styles.title}>{title}</h2>
      <button onClick={() => scrollToNextCard("prev")}>{"<"}</button>
      <div ref={scrollContainer} className={styles.scrollable}>
        {cardsData.map((card, index) => (
          <Card key={index} data={card} />
        ))}
      </div>
      <button onClick={() => scrollToNextCard("next")}>{">"}</button>
    </section>
  );
};

export default CardContainer;
