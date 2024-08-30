import React, { ChangeEventHandler, useState } from "react";

import styles from "./AnimatedAutoGrowTextArea.module.scss";
import AutoGrowTextArea from "../AutoGrowTextArea/AutoGrowTextArea";
import AnimatedPlaceholder from "components/Basic/AnimatedPlaceholder/AnimatedPlaceholder";
import { generateUniqueId } from "utils/functions";
import useInputAccessibility from "utils/hooks/useInputAccessibility";

type Props = {
  value: string | number;
  onChange: ChangeEventHandler;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;

  onFocus?: () => void;
  onBlur?: () => void;

  className?: string;

  showError?: boolean;
  errorMessage?: string;
  ariaLabel?: string;
  required?: boolean;
};

const defaultId = generateUniqueId(16);

function AnimatedAutoGrowTextArea(props: Props) {
  const {
    value,
    onChange,
    id = defaultId,
    name = "",
    placeholder = "",
    disabled = false,
    onFocus = () => {},
    onBlur = () => {},
    className = "",
    showError = false,
    errorMessage = "",
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
    <div className={`${styles["animated-textarea-wrapper"]} ${className} `}>
      <AutoGrowTextArea
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        showError={showError}
        errorMessage={errorMessage}
        disabled={disabled}
        {...accessibilityProps}
      />
      <AnimatedPlaceholder
        id={id}
        placeholder={placeholder}
        isAnimated={isAnimated}
        isFocus={isFocus}
      />
    </div>
  );
}

export default AnimatedAutoGrowTextArea;
