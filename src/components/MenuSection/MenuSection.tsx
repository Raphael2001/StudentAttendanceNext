"use client";

import React from "react";

import styles from "./MenuSection.module.scss";
import { Menu } from "utils/types/initApp";
import Text from "components/Text/Text";
import MenuItem from "components/MenuItem/MenuItem";

function MenuSection(props: Menu) {
  const { _id, items, menu_id, title } = props;

  return (
    <div className={styles["menu-section-wrapper"]}>
      <Text tag="h3" className={styles["menu-title"]}>
        {title}
      </Text>
      <div className={styles["items-wrapper"]}>
        {items.map((item) => {
          return <MenuItem key={item._id} {...item} />;
        })}
      </div>
    </div>
  );
}

export default MenuSection;
