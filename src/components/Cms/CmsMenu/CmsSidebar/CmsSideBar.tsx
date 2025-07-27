"use client";

import styles from "./CmsSideBar.module.scss";

import { useAppSelector } from "utils/hooks/useRedux";
import CmsMenuItem from "../CmsMenuItem/CmsMenuItem";

function CmsSideBar() {
  const modules = useAppSelector((store) => store.init.modules);
  const permission = useAppSelector((store) => store.userData.permission);

  return (
    <div className={styles["sidebar-menu-list"]}>
      {modules &&
        modules.map((module, index) => {
          if (module.bitwise & permission) {
            return <CmsMenuItem key={"item-link-" + index} module={module} />;
          }
        })}
    </div>
  );
}

export default CmsSideBar;
