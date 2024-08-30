import React, { HTMLInputTypeAttribute, forwardRef } from "react";

import styles from "./TextInput.module.scss";
import { inputEvent, onKeyDownInput } from "utils/types/inputs";
import BasicInput from "components/Basic/BasicInput/BasicInput";
import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";
import useInputAccessibility from "utils/hooks/useInputAccessibility";
import { clsx, generateUniqueId } from "utils/functions";

type Props = {
  value: string | number;
  onChange: (e: inputEvent) => void;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  showError?: boolean;
  errorMessage?: string;

  onFocus?: () => void;
  onBlur?: () => void;
  type?: HTMLInputTypeAttribute;
  onKeyDown?: (e: onKeyDownInput) => void;
  ariaLabel?: string;
  required?: boolean;
};

const defaultId = generateUniqueId(16);

const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
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
    onKeyDown = () => {},
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

  return (
    <div className={clsx(styles["cms-input-wrapper"], className)}>
      <BasicInput
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        className={className}
        onKeyDown={onKeyDown}
        {...accessibilityProps}
      />
      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
});
TextInput.displayName = "TextInput";

export default TextInput;
