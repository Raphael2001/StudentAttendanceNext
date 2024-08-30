"use client";

import React, { useState } from "react";

import styles from "./AddToCartButtons.module.scss";
import { BUTTON_SIZE } from "constants/ButtonTypes";
import { Button } from "components/Button/Button";
import CounterButton from "components/CounterButton/CounterButton";

type Props = {
  onSubmit: (quantity: number) => void;
};

function AddToCartButtons(props: Props) {
  const { onSubmit } = props;
  const [quantity, setQuantity] = useState(1);

  function onConuterChange(value: number) {
    setQuantity(value);
  }

  return (
    <div className={styles["actions"]}>
      <Button
        text="הוספה לסל"
        color={"default"}
        size={BUTTON_SIZE.SMALL}
        hasApiCall
        shadow
        onClick={() => onSubmit(quantity)}
        className={styles["button-add-to-cart"]}
      />
      <CounterButton
        className={styles["button-counter"]}
        value={quantity}
        onChange={onConuterChange}
      />
    </div>
  );
}

export default AddToCartButtons;
