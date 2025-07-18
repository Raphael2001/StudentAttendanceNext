"use client";

import styles from "./LogoutButton.module.scss";
import LOCAL_STORAGE_KEYS from "constants/LocalStorage";
import { resetTokens } from "redux-store/features/tokensSlice";
import { useAppDispatch } from "utils/hooks/useRedux";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import LocalStorageService from "services/LocalStorageService";
import Logout from "components/General/Svg/Logout";
import useCmsSideBar from "utils/hooks/useCmsSideBar";
import { clsx } from "utils/functions";

function LogoutButton() {
  const dispatch = useAppDispatch();

  const translate = useCMSTranslate();

  const { showText } = useCmsSideBar();

  function logout() {
    LocalStorageService.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    dispatch(resetTokens());
  }

  return (
    <div className={styles["logout-wrapper"]}>
      <button className={styles["logout-button"]} onClick={logout}>
        <Logout className={styles["logout-image"]} />

        <span
          className={clsx(
            styles["logout-title"],
            showText && styles["show-text"],
          )}
        >
          {translate("logout")}
        </span>
      </button>
    </div>
  );
}

export default LogoutButton;
