"use client";

import React from "react";

import styles from "./AppButton.module.scss";
import Text from "../Text/Text";
import FormButton from "components/General/Forms/FormButton/FormButton";

type Props = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  isDisabled?: boolean;
};

function AppButton(props: Props) {
  const { text, onClick } = props;

  function onClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (typeof onClick === "function") {
      onClick(e);
    }
  }

  return (
    <FormButton className={styles["button"]} onClick={onClickHandler}>
      <Text tag="span" className={styles["text"]}>
        {text}
      </Text>
    </FormButton>
  );
}

export default AppButton;
