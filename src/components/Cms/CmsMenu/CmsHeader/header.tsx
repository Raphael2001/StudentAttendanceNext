import React from "react";

import styles from "./header.module.scss";
import BurgerIcon from "../BurgerIcon/BurgerIcon";
import { setBurger } from "redux-store/features/burgerStateSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks/useRedux";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

export default function CMSHeader() {
  const dispatch = useAppDispatch();
  const isBurgerOpen = useAppSelector((store) => store.burgerState);

  const translate = useCMSTranslate();

  const handleBurgerClick = () => {
    dispatch(setBurger(true));
  };

  return (
    <header className={styles["cms-header"]}>
      <div className={styles["burger-wrapper"]}>
        <BurgerIcon onClick={handleBurgerClick} isOpen={isBurgerOpen} />
      </div>
      <div className={styles["title-wrapper"]}>
        <span className={styles["title"]}>{translate("cms")}</span>
      </div>
      <div className={styles["empty"]}></div>
    </header>
  );
}
