import React from "react";

import styles from "./AppleButton.module.scss";
import { clsx } from "utils/functions";

function AppleButtons() {
  return (
    <div className={styles["buttons"]}>
      <div className={clsx(styles["item-button"], styles["item-button-red"])} />
      <div
        className={clsx(styles["item-button"], styles["item-button-yellow"])}
      />
      <div
        className={clsx(styles["item-button"], styles["item-button-green"])}
      />
    </div>
  );
}

export default AppleButtons;
