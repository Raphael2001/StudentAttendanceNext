import React from "react";

import styles from "./BurgerMenu.module.scss";

import CmsSideBar from "components/Cms/CmsMenu/CmsSidebar/CmsSideBar";
import LogoutButton from "components/Cms/CmsMenu/LogoutButton/LogoutButton";
import { setBurger } from "redux-store/features/burgerStateSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks/useRedux";

export default function BurgerMenu(props) {
  const state = useAppSelector((store) => store.burgerState);
  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(setBurger(false));
  };

  return (
    <div
      className={`${styles["burger-menu-wrapper"]}  ${
        state ? styles["active"] : ""
      }`}
    >
      <div className={styles["burger-menu-wrapper"]}>
        <div className={styles["backdrop"]} onClick={handleCloseClick} />
        <div className={styles["burger-menu"]}>
          <CmsSideBar />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
