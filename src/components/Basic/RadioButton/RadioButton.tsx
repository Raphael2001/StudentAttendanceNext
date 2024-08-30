"use client";

import React, { ChangeEventHandler } from "react";

import styles from "./RadioButton.module.scss";
import { clsx } from "utils/functions";

type Props = {
  text: string;
  id: string;
  value: string;
  onChange: ChangeEventHandler;
  name: string;
  disabled?: boolean;
};

function RadioButton(props: Props) {
  const { id, text, value, onChange, name, disabled } = props;

  const isSelecetd = id === value;

  return (
    <div
      className={clsx(
        styles["radio-button"],
        isSelecetd ? styles["selected"] : ""
      )}
    >
      <input
        type="radio"
        className={clsx(styles["input"], disabled ? styles["disabled"] : "")}
        id={id}
        onChange={onChange}
        name={name}
        checked={isSelecetd}
        disabled={disabled}
      />
      <label htmlFor={id} className={styles["radio-content"]}>
        <div className={styles["radio-outer-circle"]}>
          <div className={styles["radio-inner-circle"]}></div>
        </div>
        <span className={styles["radio-text"]}>{text}</span>
      </label>
    </div>
  );
}

export default RadioButton;
