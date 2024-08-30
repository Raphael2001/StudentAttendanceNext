"use client";

import React, { ChangeEventHandler } from "react";

import styles from "./BorderInput.module.scss";
import { clsx, generateUniqueId } from "utils/functions";
import useInputAccessibility from "utils/hooks/useInputAccessibility";
import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";
import BasicInput from "components/Basic/BasicInput/BasicInput";

type Props = {
  value: string | number;
  onChange: ChangeEventHandler;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  showError?: boolean;
  errorMessage?: string;
  type?: string;
  ariaLabel?: string;
  required?: boolean;
  title?: string;
};
const defaultId = generateUniqueId(16);

function BorderInput(props: Props) {
  const {
    value,
    onChange,
    id = defaultId,
    name = "",
    className = "",
    placeholder = "",
    type = "",
    disabled = false,
    showError = false,
    errorMessage = "",
    ariaLabel = "",
    required = false,
    title = "",
  } = props;

  const accessibilityProps = useInputAccessibility({
    ariaLabel,
    showError,
    required,
    placeholder,
    name,
  });

  return (
    // Input wrapper
    <div className={clsx(styles["input-wrapper"], className)}>
      <span className={styles["title"]}>{title}</span>
      <BasicInput
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        className={styles["input"]}
        {...accessibilityProps}
      />

      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
}

export default BorderInput;
