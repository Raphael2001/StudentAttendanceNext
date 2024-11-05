"use client";

import React from "react";

import styles from "./privacy.module.scss";
import useTranslate from "utils/hooks/useTranslate";

function Privacy() {
  const translate = useTranslate();
  return (
    <p className={styles["privacy-text"]}>{translate("privacy_policy")}</p>
  );
}

export default Privacy;
