import React from "react";
import styles from "./css/LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default LoadingSpinner;
