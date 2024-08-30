"use client";

import React, { useMemo } from "react";

import styles from "./CounterButton.module.scss";
import { clsx } from "utils/functions";

type Props = {
  maxAllowd?: number;
  value: number;
  minAllowed?: number;
  onChange: (value: number) => void;
  className?: string;
  shadow?: false;
};

function CounterButton(props: Props) {
  const {
    value = 1,
    maxAllowd = 99,
    minAllowed = 1,
    className = "",
    shadow = false,
    onChange,
  } = props;

  const disableMinus = useMemo(() => value === minAllowed, [minAllowed, value]);
  const disablePlus = useMemo(() => value === maxAllowd, [maxAllowd, value]);

  function onIncrement() {
    if (value < maxAllowd) {
      onChange(value + 1);
    }
  }

  function onDecrement() {
    if (value > minAllowed) {
      onChange(value - 1);
    }
  }

  return (
    <div
      className={clsx(
        styles["counter-button-wrapper"],
        shadow ? styles["shadow"] : "",
        className
      )}
    >
      <button
        className={clsx(
          styles["action"],
          disablePlus ? styles["disabled"] : ""
        )}
        onClick={onIncrement}
        disabled={disablePlus}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="12"></circle>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 12C4 12.5523 4.44772 13 5 13H10.8333C10.9254 13 11 13.0746 11 13.1667V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13.1667C13 13.0746 13.0746 13 13.1667 13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13.1667C13.0746 11 13 10.9254 13 10.8333V5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V10.8333C11 10.9254 10.9254 11 10.8333 11H5C4.44772 11 4 11.4477 4 12Z"
          ></path>
        </svg>
      </button>
      <span className={styles["value"]}>{value}</span>

      <button
        className={clsx(
          styles["action"],
          disableMinus ? styles["disabled"] : ""
        )}
        disabled={disableMinus}
        onClick={onDecrement}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="12"></circle>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default CounterButton;
