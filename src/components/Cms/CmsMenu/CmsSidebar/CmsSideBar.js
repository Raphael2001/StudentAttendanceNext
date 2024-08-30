"use client";

import { React } from "react";

import styles from "./CmsSideBar.module.scss";

import MenuItem from "../MenuItem/MenuItem";
import { useAppSelector } from "utils/hooks/useRedux";
function shouldShow(item) {
  return item.show ?? true;
}

function CmsSideBar(props) {
  const modules = useAppSelector((store) => store.init.modules);
  const permission = useAppSelector((store) => store.userData.permission);

  return (
    <div className={styles["sidebar-menu-list"]}>
      {modules &&
        modules.map((item, index) => {
          if (item.bitwise & permission && shouldShow(item)) {
            return <MenuItem key={"item-link-" + index} item={item} />;
          }
        })}
    </div>
  );
}

export default CmsSideBar;
