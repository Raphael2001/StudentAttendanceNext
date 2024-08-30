"use client";

import { React } from "react";

import styles from "./BurgerIcon.module.scss";

function BurgerIcon(props) {
  const { onClick, isOpen = false } = props;

  return (
    <button
      onClick={onClick}
      className={`${styles["navbar-toggler"]} ${isOpen ? styles["open"] : ""}`}
      type="button"
    >
      <label className={styles["label"]}>
        <span className={styles["burger"]}></span>
      </label>
    </button>
  );
}

export default BurgerIcon;
