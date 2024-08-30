import React from "react";

import styles from "./ActionButtonText.module.scss";

type Props = {
  text: string;

  onClick: () => void;
  color: string;
};

function ActionButtonText({ text, color, onClick }: Props) {
  return (
    <button
      className={`${styles["action-button-text"]} item ${color}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ActionButtonText;
