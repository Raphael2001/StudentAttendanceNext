"use client";
import React, { useMemo } from "react";

import styles from "./Button.module.scss";
import {
  ButtonSize,
  ButtonColor,
  ButtonShape,
  ButtonVariant,
} from "utils/types/button";
import {
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from "constants/ButtonTypes";
import { clsx } from "utils/functions";
import { useAppSelector } from "utils/hooks/useRedux";

type basicButtonProps = {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  shape?: ButtonShape;
  shadow?: boolean;
  color?: ButtonColor;
  variant?: ButtonVariant;
  isLoading?: boolean;
  size?: ButtonSize;
  link?: string;
  hasApiCall?: boolean;
  className?: string;
};

type Props = {
  leadingIcon?: string;
  trailingIcon?: string;
  text: string;
};

export function Button(props: Props & basicButtonProps) {
  const {
    size = BUTTON_SIZE.MEDIUM,
    variant = BUTTON_VARIANT.PRIMARY,
    disabled = false,
    shape = BUTTON_SHAPE.ROUNDED,
    leadingIcon,
    trailingIcon,
    text,
    onClick,
    color = "default",
    shadow = false,
    isLoading = false,
    link,
    hasApiCall = false,
    className = "",
  } = props;

  const queue = useAppSelector((store) => store.apiQueue);

  const hasActiveApiCall = useMemo(
    () => Array.isArray(queue) && queue.length > 0,
    [queue]
  );

  const shouldShowLoader = hasApiCall
    ? hasActiveApiCall || isLoading
    : isLoading;

  const sizeClass = styles[size];
  const variantClass = styles[variant];
  const disabledClass = disabled || shouldShowLoader ? styles["disabled"] : "";
  const shapeClass = styles[shape];
  const colorClass = styles[color];
  const shadowClass = shadow ? styles["shadow"] : "";

  const classes = clsx(
    styles["basic-button"],
    styles["button"],
    sizeClass,
    variantClass,
    shapeClass,
    colorClass,
    shadowClass,
    disabledClass,
    shouldShowLoader ? styles["loading"] : "",

    className
  );

  if (link) {
    return (
      <a href={link} className={classes}>
        <ButtonLoader loading={shouldShowLoader} />

        {leadingIcon && <Icon icon={leadingIcon} />}
        <span className={styles["text"]}>{text}</span>
        {trailingIcon && <Icon icon={trailingIcon} />}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      <ButtonLoader loading={shouldShowLoader} />

      {leadingIcon && <Icon icon={leadingIcon} />}
      <span className={styles["text"]}>{text}</span>
      {trailingIcon && <Icon icon={trailingIcon} />}
    </button>
  );
}

type IconOnlyProps = {
  icon: string;
};

export function IconButton(props: IconOnlyProps & basicButtonProps) {
  const {
    size = BUTTON_SIZE.MEDIUM,
    variant = BUTTON_VARIANT.PRIMARY,
    disabled = false,
    shape = BUTTON_SHAPE.ROUNDED,
    onClick,
    color = "success",
    shadow = true,
    isLoading = false,
    icon,
    link,
    hasApiCall = false,
    className = "",
  } = props;

  const queue = useAppSelector((store) => store.apiQueue);

  const hasActiveApiCall = useMemo(
    () => Array.isArray(queue) && queue.length > 0,
    [queue]
  );
  const shouldShowLoader = hasApiCall
    ? hasActiveApiCall || isLoading
    : isLoading;

  const sizeClass = styles[size];
  const variantClass = styles[variant];
  const disabledClass = disabled || shouldShowLoader ? styles["disabled"] : "";
  const shapeClass = styles[shape];
  const colorClass = styles[color];
  const shadowClass = shadow ? styles["shadow"] : "";

  const classes = clsx(
    styles["basic-button"],
    styles["icon-button"],
    sizeClass,
    variantClass,
    shapeClass,
    colorClass,
    shadowClass,
    disabledClass,
    shouldShowLoader ? styles["loading"] : "",
    className
  );

  if (link) {
    return (
      <a href={link} className={classes}>
        <ButtonLoader loading={shouldShowLoader} />
        <Icon icon={icon} />
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      <ButtonLoader loading={shouldShowLoader} />
      <Icon icon={icon} />
    </button>
  );
}

function Icon({ icon }) {
  return (
    <div className={styles["icon"]}>
      <img src={icon} alt="" />
    </div>
  );
}

function ButtonLoader({ loading = false }) {
  if (!loading) {
    return null;
  }
  return <span className={clsx(styles["loader"])} />;
}
