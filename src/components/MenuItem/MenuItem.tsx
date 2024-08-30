"use client";

import React from "react";

import styles from "./MenuItem.module.scss";
import { Item } from "utils/types/initApp";
import SmartMedia from "components/SmartMedia/SmartMedia";
import Text from "components/Text/Text";
import Price from "components/Price/Price";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";

function MenuItem(props: Item) {
  const { description, inStock, media, price, title, ingredientsMenus, _id } =
    props;

  const openPopup = usePopup();
  function openProductPopup() {
    const payload = {
      media,
      title,
      ingredientsMenus,
      price,
      description,
      id: _id,
    };

    openPopup(POPUP_TYPES.PRODUCT, payload);
  }

  return (
    <div className={styles["menu-item-wrapper"]}>
      <SmartMedia
        item={media}
        className={styles["media"]}
        skeletonClassName={styles["media-wrapper"]}
      />
      <div className={styles["content"]}>
        <button
          className={styles["plus-icon-wrapper"]}
          onClick={openProductPopup}
        >
          <span className={styles["plus-icon"]}>+</span>
        </button>
        <div className={styles["top"]}>
          <Text tag="span" className={styles["title"]}>
            {title}
          </Text>
          <Text tag="p" className={styles["description"]}>
            {description}
          </Text>
        </div>
        <div className={styles["price-wrapper"]}>
          <Price inStock={inStock} value={price} />
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
