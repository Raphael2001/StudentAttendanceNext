"use client";

import React from "react";
import { clsx } from "utils/functions";
import styles from "./CmsMenuItem.module.scss";
import CmsSideBarIcon from "../CmsSideBarIcon/CmsSideBarIcon";
import Chevron from "components/General/Svg/Chevron";
import Text from "components/App/Text/Text";
import useCmsSideBar from "utils/hooks/useCmsSideBar";

type Props = {
  isActive: boolean;
  title: string;
  module: string;
  showChevron?: boolean;
};

export default function LinkItemContent(props: Props) {
  const { isActive, title, module, showChevron = false } = props;
  const { showText, isSideBarOpen } = useCmsSideBar();

  return (
    <>
      <div className={styles["menu-link-content"]}>
        <CmsSideBarIcon module={module} isActive={isActive} />

        <Text
          tag="span"
          className={clsx(
            styles["menu-link-text"],
            isActive && styles["active"],
            showText && styles["show-text"],
            isSideBarOpen && styles["sidebar-open"],
          )}
        >
          {title}
        </Text>
      </div>
      {showChevron ? <Chevron className={styles["chevron"]} /> : null}
    </>
  );
}
