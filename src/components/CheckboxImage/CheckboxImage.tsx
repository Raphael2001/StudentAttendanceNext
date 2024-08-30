"use client";

import React from "react";

import styles from "./CheckboxImage.module.scss";

import CheckBoxEmpty from "/public/assets/icons/checkbox/checkbox.svg";
import Checkmark from "/public/assets/icons/checkbox/checkmark.svg";
import { clsx } from "utils/functions";

type Props = {
  isSelected: boolean;
  className?: string;
};

function CheckboxImage(props: Props) {
  const { isSelected, className = "" } = props;

  return (
    <div className={clsx(styles["checkbox-image-wrapper"], className)}>
      <img
        src={CheckBoxEmpty.src}
        alt="checkbox"
        className={styles["checkbox-img"]}
      />

      {isSelected && (
        <img
          alt="checkmark"
          src={Checkmark.src}
          className={clsx(styles["chekcmark-img"], "input-icon-mark")}
        />
      )}
    </div>
  );
}

export default CheckboxImage;
