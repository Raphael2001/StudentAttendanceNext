"use client";

import React from "react";

import styles from "./AnimatedPlaceholder.module.scss";

type Props = {
  id: string;
  placeholder: string;
  isAnimated: boolean;
  isFocus: boolean;
};

function AnimatedPlaceholder(props: Props) {
  const { id, placeholder, isAnimated, isFocus } = props;

  return (
    <label
      htmlFor={id}
      className={`${styles["placeholder"]} ${
        isAnimated ? styles["animated"] : ""
      } ${isFocus ? styles["focused"] : ""}`}
    >
      {placeholder}
    </label>
  );
}

export default AnimatedPlaceholder;
