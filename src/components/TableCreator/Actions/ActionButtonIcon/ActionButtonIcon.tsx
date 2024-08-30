import React from "react";

import styles from "./ActionButtonIcon.module.scss";

type Props = {
  icon: string;

  onClick: () => void;
};

function ActionButtonIcon({ icon, onClick }: Props) {
  return (
    <button className={`${styles["action-button-icon"]}`} onClick={onClick}>
      <img src={icon} />
    </button>
  );
}

export default ActionButtonIcon;
