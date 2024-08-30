"use client";

import React, { useRef } from "react";

import styles from "./CmsButton.module.scss";
import { clsx } from "utils/functions";

type Props = {
  className?: string;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  color?: string;
};

function CmsButton(props: Props) {
  const {
    className = "",
    onClick,
    text = "",
    isDisabled = "",
    color = "",
  } = props;

  const spanRef = useRef<HTMLSpanElement>(null);

  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    createRipple(event);
    setTimeout(() => {
      typeof onClick === "function" && onClick(event);
    }, 400);
  };

  function createRipple(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const button = event.currentTarget;

    if (spanRef.current) {
      const circle = spanRef.current;

      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
      circle.style.top = `${event.clientY - button.offsetTop - radius}px`;

      button.appendChild(circle);
    }
  }

  return (
    <button
      className={clsx(
        styles["button"],
        isDisabled ? styles["disabled"] : "",
        color ? `item ${color}` : "",
        className
      )}
      onClick={onClickHandler}
    >
      {text}
      <span
        ref={spanRef}
        className={clsx(styles["ripple-creator"], styles["ripple"])}
      ></span>
    </button>
  );
}

export default CmsButton;
