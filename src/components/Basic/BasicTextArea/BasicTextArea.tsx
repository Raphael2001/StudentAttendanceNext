import React, { ChangeEventHandler, forwardRef } from "react";

import styles from "./BasicTextArea.module.scss";
import { InputAccessibility } from "utils/types/form";

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
  rows?: number;
};

const BasicTextArea = forwardRef<
  HTMLTextAreaElement,
  Props & InputAccessibility
>((props, ref) => {
  const {
    value,
    onChange,
    id = "",
    name = "",
    placeholder = "",
    disabled = false,
    onFocus = () => {},
    onBlur = () => {},
    className = "",
    rows = 1,
    ariaRequired = false,
    ariaInvalid = false,
    ariaLabel = "",
    ariaLabelledBy = "",
  } = props;

  return (
    <textarea
      ref={ref}
      rows={rows}
      onChange={onChange}
      value={value}
      className={`${styles["text-area"]} ${
        disabled ? styles["disabled"] : ""
      } ${className}`}
      name={name}
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-required={ariaRequired}
      aria-invalid={ariaInvalid}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
    />
  );
});
BasicTextArea.displayName = "BasicTextArea";

export default BasicTextArea;
