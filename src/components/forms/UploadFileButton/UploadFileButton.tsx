"use client";

import React, { ChangeEventHandler } from "react";

import styles from "./UploadFileButton.module.scss";
import { clsx, generateUniqueId } from "utils/functions";
import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";

type Props = {
  accept?: string;
  onChange: ChangeEventHandler;
  placeholder: string;
  name?: string;
  className?: string;
  showError?: boolean;
  errorMessage?: string;
  id?: string;
  disabled?: boolean;
  value?: File;
  inputClassName?: string;
};

const defaultId = generateUniqueId(16);

const UploadFileButton = (props: Props) => {
  const {
    accept = "*",
    onChange = () => {},
    placeholder,
    name = "",
    className = "",
    disabled = false,
    showError = false,
    errorMessage = "",
    id = defaultId,
    value,
    inputClassName = "",
  } = props;

  function renderButton() {
    return (
      <>
        <input
          id={id}
          className={styles["media-file"]}
          type="file"
          accept={accept}
          onChange={onChange}
          name={name}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={clsx(
            styles["media-file-label"],
            disabled ? styles["disabled"] : "",
            inputClassName
          )}
        >
          {placeholder}
        </label>
      </>
    );
  }

  return (
    <div className={clsx(styles["file-input-wrapper"], className)}>
      {renderButton()}
      {value && <span className={styles["file-name-title"]}>{value.name}</span>}
      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
};

export default UploadFileButton;
