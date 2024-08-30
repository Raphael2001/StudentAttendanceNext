"use client";

import React, { ChangeEventHandler } from "react";

import styles from "./ChexkBoxs.module.scss";
import CheckBox from "../CheckBox/CheckBox";
import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";

type checkboxOption = {
  _id: string;
};

type Props = {
  options: Array<checkboxOption>;
  disabled?: boolean;
  value: string;
  onChange: ChangeEventHandler;
  showError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  field?: string;
  name: string;
  bitwiseValueField?: string;
};

function BitwiseCheckbox(props: Props) {
  const {
    options = [],
    name,
    onChange,
    value,
    showError = false,
    errorMessage = "",
    placeholder,
    disabled = false,
    field = "text",
    bitwiseValueField = "bitwise",
  } = props;

  const valueAsNumber = Number(value);

  return (
    <div className={styles["checkboxs-wrapper"]}>
      {placeholder && <span className={styles["title"]}>{placeholder}</span>}
      <div className={styles["inputs"]}>
        {options.map((option) => {
          const bitwiseValue = Number(option[bitwiseValueField]);
          return (
            <CheckBox
              key={"option" + option._id}
              id={option._id}
              name={name}
              label={option[field]}
              onChange={onChange}
              disabled={disabled}
              value={!!(valueAsNumber & bitwiseValue)}
            />
          );
        })}
      </div>
      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
}

export default BitwiseCheckbox;
