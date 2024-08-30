"use client";

import React, { useRef } from "react";

import styles from "./ProductPopup.module.scss";
import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import SmartMedia from "components/SmartMedia/SmartMedia";
import { Media } from "utils/types/media";
import { clsx } from "utils/functions";
import Price from "components/Price/Price";
import Text from "components/Text/Text";
import IngredientsForm from "components/IngredientsChooser/IngredientsChooser";
import AddToCartButtons from "components/AddToCartButtons/AddToCartButtons";

type Props = {
  payload: Payload;
};

type Payload = {
  media: Media;
  title: string;
  ingredientsMenus: Array<string>;
  price: string;
  description: string;
  id: string;
};
function ProductPopup(props: Props) {
  const { payload } = props;
  const { media, ingredientsMenus, title, price, description, id } = payload;
  const ref = useRef<SlidePopupRef>();

  function addToCart(quantity: number) {
    console.log("id", id);
  }

  return (
    <SlidePopup className={styles["product-popup"]} ref={ref}>
      <div className={styles["wrapper"]}>
        <SmartMedia
          item={media}
          className={styles["media"]}
          skeletonClassName={clsx(styles["media-wrapper"])}
        />
        <div className={styles["top"]}>
          <Text tag="h4" className={styles["title"]}>
            {title}
          </Text>

          <Price value={price} className={styles["price"]} />
          <Text tag="p" className={styles["description"]}>
            {description}
          </Text>
        </div>
        {Array.isArray(ingredientsMenus) ? (
          <div className={styles["bottom"]}>
            <div className={styles["border"]} />
            <IngredientsForm ingredientsMenus={ingredientsMenus} itemId={id} />
          </div>
        ) : (
          <div className={styles["simple-item-actions"]}>
            <AddToCartButtons onSubmit={addToCart} />
          </div>
        )}
      </div>
    </SlidePopup>
  );
}

export default ProductPopup;
