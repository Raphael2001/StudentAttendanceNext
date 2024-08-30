"use client";

import React, { ChangeEventHandler } from "react";

import styles from "./Options.module.scss";
import { Ingredient } from "utils/types/initApp";
import RadioButton from "components/Basic/RadioButton/RadioButton";
import CheckBox from "components/forms/CheckBox/CheckBox";
import Price from "components/Price/Price";
import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";

type Props = {
  name: string;
  options: Array<Ingredient>;
  onChange: ChangeEventHandler;
  title?: string;
  subtitle?: string;
  isFree?: boolean;
  showError?: boolean;
  errorMessage?: string;
};

type RadioProps = {
  value: string;
};
type CheckboxProps = {
  value: Array<string>;
  maxOptions: number;
};

export function RadioOptions(props: Props & RadioProps) {
  const {
    options = [],
    name,
    onChange,
    value,
    title,
    subtitle,
    isFree = false,
    showError = false,
    errorMessage = "",
  } = props;

  return (
    <div className={styles["options-wrapper"]}>
      {title && <span className={styles["title"]}>{title}</span>}
      {subtitle && <span className={styles["subtitle"]}>{subtitle}</span>}
      <div className={styles["inputs"]}>
        {options.map((option) => {
          return (
            <PriceWrapper
              key={"option" + name + option._id}
              price={option.price}
              showPrice={!isFree}
            >
              <RadioButton
                id={name + "-" + option._id}
                name={name}
                text={option.title}
                onChange={onChange}
                value={name + "-" + value}
                disabled={false} // todo fix this
              />
            </PriceWrapper>
          );
        })}
      </div>
      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
}

export function CheckboxOptions(props: Props & CheckboxProps) {
  const {
    options = [],
    name,
    onChange,
    value,
    title,
    subtitle,
    isFree = false,
    maxOptions = 1,
    showError = false,
    errorMessage = "",
  } = props;

  const isReachedMax = value.length >= maxOptions;

  return (
    <div className={styles["options-wrapper"]}>
      {title && <span className={styles["title"]}>{title}</span>}
      {subtitle && <span className={styles["subtitle"]}>{subtitle}</span>}
      <div className={styles["inputs"]}>
        {options.map((option) => {
          const isSelected = value.includes(option._id);
          const isDisabled = isReachedMax && !isSelected;
          return (
            <PriceWrapper
              key={"option" + name + option._id}
              price={option.price}
              showPrice={!isFree}
            >
              <CheckBox
                id={name + "-" + option._id}
                name={name}
                label={option.title}
                onChange={onChange}
                disabled={isDisabled} // todo fix this
                value={value.includes(option._id)}
              />
            </PriceWrapper>
          );
        })}
      </div>
      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
}

function PriceWrapper({ children, price, showPrice = true }) {
  const priceNum = Number(price);
  return (
    <div className={styles["row"]}>
      {children}
      {!!priceNum && showPrice && (
        <div className={styles["price-wrapper"]}>
          <Price value={price} className={styles["price"]} />
          <span className={styles["plus"]}>+</span>
        </div>
      )}
    </div>
  );
}
