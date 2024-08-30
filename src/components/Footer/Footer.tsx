"use client";

import React from "react";

import styles from "./Footer.module.scss";
import { useAppSelector } from "utils/hooks/useRedux";

function Footer() {
  const creditName = useAppSelector((store) => store.apiValidation.creditName);
  const creditUrl = useAppSelector((store) => store.apiValidation.creditUrl);
  return (
    <footer className={styles["footer-wrapper"]}>
      <span className={styles["version-num"]}>v{process.env.version}</span>

      <a className={styles["credit-link"]} target="_blank" href={creditUrl}>
        {`created by ${creditName}`}
      </a>
    </footer>
  );
}

export default Footer;
