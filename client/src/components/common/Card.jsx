import React from "react";
import styles from "./Card.module.css";

export default function Card({ title, content }) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}
