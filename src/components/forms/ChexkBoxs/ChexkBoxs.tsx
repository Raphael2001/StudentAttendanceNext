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
};

function formatStringToArray(str: string) {
  // Split the string by comma
  let items = str.split(",");

  // Map each item to the desired case
  return items.map((item, index) => {
    return item;
  });
}

function ChexkBoxs(props: Props) {
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
  } = props;

  const valueAsArray = formatStringToArray(value);

  return (
    <div className={styles["checkboxs-wrapper"]}>
      {placeholder && <span className={styles["title"]}>{placeholder}</span>}
      <div className={styles["inputs"]}>
        {options.map((option) => {
          return (
            <CheckBox
              key={"option" + option._id}
              id={option._id}
              name={name}
              label={option[field]}
              onChange={onChange}
              disabled={disabled}
              value={valueAsArray.includes(option._id)}
            />
          );
        })}
      </div>
      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
}

export default ChexkBoxs;
