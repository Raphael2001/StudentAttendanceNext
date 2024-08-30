"use client";

import React from "react";

import styles from "./noPermission.module.scss";

import AccessDenied from "/public/assets/icons/access-denied.svg";

function NoPermissionPage(props) {
  return (
    <div className={styles["no-permission-wrapper"]}>
      <span className={styles["title"]}>אין לך הרשאות לעמוד זה</span>

      <div className={styles["image-wrapper"]}>
        <img src={AccessDenied.src} />
      </div>
    </div>
  );
}

export default NoPermissionPage;
