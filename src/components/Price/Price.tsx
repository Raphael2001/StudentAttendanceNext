"use client";

import React from "react";

import styles from "./Price.module.scss";
import { DISPLAY_DECIMAL_POINT } from "constants/GlobalParams";
import { clsx } from "utils/functions";

type Props = {
  inStock?: boolean;
  value: string;
  className?: string;
};

function Price(props: Props) {
  const { inStock = true, value, className = "" } = props;

  const floatingValue = Number(value).toFixed(DISPLAY_DECIMAL_POINT);

  if (!inStock) {
    return (
      <span className={clsx(styles["not-in-stock"], className)}>לא במלאי</span>
    );
  }

  return (
    <span className={clsx(styles["price"], className)}> {floatingValue} ₪</span>
  );
}

export default Price;
