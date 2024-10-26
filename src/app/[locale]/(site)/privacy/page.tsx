"use client";

import React from "react";
import { useAppSelector } from "utils/hooks/useRedux";

import styles from "./privacy.module.scss";

function Privacy() {
  const texts = useAppSelector((store) => store.initApp.texts);
  return <p className={styles["privacy-text"]}>{texts.privacy_policy}</p>;
}

export default Privacy;
