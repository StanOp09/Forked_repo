import React from "react";
import styles from "./css/Modal.module.css";

function Modal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles["modal-content"]}>
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
