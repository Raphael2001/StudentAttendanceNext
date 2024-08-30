import React, { ChangeEventHandler, useState } from "react";

import styles from "./index.module.scss";
import BasicInput from "components/Basic/BasicInput/BasicInput";

import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";
import AnimatedPlaceholder from "components/Basic/AnimatedPlaceholder/AnimatedPlaceholder";
import useInputAccessibility from "utils/hooks/useInputAccessibility";
import { clsx, generateUniqueId } from "utils/functions";
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

  onFocus?: () => void;
  onBlur?: () => void;
  type?: string;
  ariaLabel?: string;
  required?: boolean;
};

const defaultId = generateUniqueId(16);

function AnimatedInput(props: Props) {
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

    onFocus = () => {},
    onBlur = () => {},
    ariaLabel = "",
    required = false,
  } = props;

  const accessibilityProps = useInputAccessibility({
    ariaLabel,
    showError,
    required,
    placeholder,
    name,
  });

  const [isFocus, setIsFocus] = useState(false);

  function onFocusHandler() {
    setIsFocus(true);
    typeof onFocus === "function" && onFocus();
  }
  function onBlurHandler() {
    setIsFocus(false);
    typeof onBlur === "function" && onBlur();
  }

  const isAnimated = !!value || isFocus;

  return (
    // Input wrapper
    <div className={clsx(styles["animated-input-wrapper"], className)}>
      <BasicInput
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        type={type}
        disabled={disabled}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        {...accessibilityProps}
      />

      <AnimatedPlaceholder
        id={id}
        placeholder={placeholder}
        isAnimated={isAnimated}
        isFocus={isFocus}
      />

      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
}

export default AnimatedInput;
