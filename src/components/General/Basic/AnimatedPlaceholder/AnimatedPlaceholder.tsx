"use client";

import React from "react";

import defaultStyle from "components/General/Basic/AnimatedPlaceholder/AnimatedPlaceholder.module.scss";

type Props = {
  id: string;
  placeholder: string;
  isAnimated: boolean;
  isFocus: boolean;
  styles?: any;
};

function AnimatedPlaceholder(props: Props) {
  const { id, placeholder, isAnimated, isFocus, styles = defaultStyle } = props;

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
