"use client";
import React from "react";

import styles from "./SideBarMenu.module.scss";

import CmsSideBar from "../CmsSidebar/CmsSideBar";
import LogoutButton from "../LogoutButton/LogoutButton";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

import { clsx } from "utils/functions";
import useCmsSideBar from "utils/hooks/useCmsSideBar";
import Chevron from "components/General/Svg/Chevron";
import SideBarDashboard from "components/General/Svg/SideBar/SideBarDashboard";
import Text from "components/App/Text/Text";

export default function SideBarMenu() {
  const translate = useCMSTranslate();

  const { isSideBarOpen, toggleSideBar, showText } = useCmsSideBar();

  return (
    <div
      className={clsx(
        styles["sidebar-menu"],
        showText && styles["show-text"],
        isSideBarOpen && styles["sidebar-open"],
      )}
    >
      <div className={styles["sidebar-wrapper"]}>
        <div className={styles["sidebar-container"]}>
          <button
            className={clsx(styles["header-wrapper"])}
            onClick={() => {
              toggleSideBar();
            }}
          >
            <div className={styles["title-icon-wrapper"]}>
              <SideBarDashboard className={styles["dashboard-icon"]} />

              <Text tag="span" className={clsx(styles["title"])}>
                {translate("cms")}
              </Text>
            </div>

            <Chevron className={clsx(styles["arrow"])} />
          </button>
          <div className={styles["divider"]}></div>
          <div className={styles["sidebar"]}>
            <CmsSideBar />
          </div>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
