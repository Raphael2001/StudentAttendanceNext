"use client";

import styles from "./BurgerIcon.module.scss";

type Props = {
  isOpen: boolean;
  onClick: (e: React.MouseEvent) => void;
};
function BurgerIcon(props: Props) {
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
