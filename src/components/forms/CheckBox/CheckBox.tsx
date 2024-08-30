"use client";

import React, { ChangeEventHandler } from "react";

import styles from "./CheckBox.module.scss";

import { clsx } from "utils/functions";
import CheckboxImage from "components/CheckboxImage/CheckboxImage";

type Props = {
  id: string;
  name: string;
  label?: string;
  value: boolean;
  onChange: ChangeEventHandler;
  className?: string;
  disabled?: boolean;
};

function CheckBox(props: Props) {
  const {
    className = "",
    id,
    name,
    label = "",
    value = false,
    onChange,

    disabled = false,
  } = props;

  return (
    <div
      className={clsx(
        styles["checkbox-wrapper"],
        value ? styles["selecetd"] : "",
        className,
        disabled ? styles["disabled"] : ""
      )}
    >
      <input
        type={"checkbox"}
        name={name}
        id={id}
        checked={value}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <CheckboxImage isSelected={value} className={styles["image-wrapper"]} />

        {label && <span className={styles["label"]}>{label}</span>}
      </label>
    </div>
  );
}

export default CheckBox;
