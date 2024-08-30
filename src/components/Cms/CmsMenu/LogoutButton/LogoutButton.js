"use client";

import { React } from "react";

import LogoutIcon from "/public/assets/icons/logout.svg";
import styles from "./LogoutButton.module.scss";
import LOCAL_STORAGE_KEYS from "constants/LocalStorage";
import { resetTokens } from "redux-store/features/tokensSlice";
import { useAppDispatch } from "utils/hooks/useRedux";

function LogoutButton(props) {
  const dispatch = useAppDispatch();

  function logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    dispatch(resetTokens());
  }

  return (
    <div className={styles["logout-wrapper"]}>
      <button className={styles["logout-button"]} onClick={logout}>
        <div className={styles["logout-image"]}>
          <img src={LogoutIcon.src} />
        </div>
        <span className={styles["logout-title"]}>התנתקות</span>
      </button>
    </div>
  );
}

export default LogoutButton;
