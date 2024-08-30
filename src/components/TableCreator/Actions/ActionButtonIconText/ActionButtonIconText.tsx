import React from "react";

import styles from "./ActionButtonIconText.module.scss";

type Props = {
  text: string;
  icon: string;
  onClick: () => void;
  color: string;
};
function ActionButtonIconText({ text, icon, onClick, color }: Props) {
  return (
    <button
      className={`${styles["action-button-text"]} item ${color}`}
      onClick={onClick}
    >
      <div className={styles["icon-wrapper"]}>
        <img src={icon} />
      </div>
      {text}
    </button>
  );
}

export default ActionButtonIconText;
