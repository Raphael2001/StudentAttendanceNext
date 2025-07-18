"use client";

import React from "react";

import styles from "./noPermission.module.scss";

import useCMSTranslate from "utils/hooks/useCMSTranslate";

function NoPermissionPage() {
  const translate = useCMSTranslate();
  return (
    <div className={styles["no-permission-wrapper"]}>
      <span className={styles["title"]}>{translate("access_denied")}</span>

      <div className={styles["image-wrapper"]}>
        <img src={"/assets/icons/access-denied.svg"} />
      </div>
    </div>
  );
}

export default NoPermissionPage;
