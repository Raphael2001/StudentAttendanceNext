"use client";

import React from "react";

import styles from "./ActionButton.module.scss";

type Props = {
  src: string;
  className?: string;
  onClick: () => void;
};

function ActionButton(props: Props) {
  const { src, className = "", onClick } = props;
  return (
    <button
      className={`${styles["action-button-icon"]} ${className}`}
      onClick={onClick}
    >
      <img src={src} />
    </button>
  );
}

export default ActionButton;
