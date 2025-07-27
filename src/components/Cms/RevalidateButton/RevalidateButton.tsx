"use client";

import React from "react";

import styles from "./RevalidateButton.module.scss";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import CmsButton from "../CmsButton/CmsButton";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

function RevalidateButton() {
  const { onSuccessNotification } = useNotificationsHandler();
  const translate = useCMSTranslate();
  function revalidateSite() {
    fetch("/api/revalidate")
      .then((res) => res.json())
      .then((res) => {
        onSuccessNotification();
      });
  }
  return (
    <div className={styles["site-btn"]}>
      <CmsButton
        className={"update"}
        text={translate("revalidate_site")}
        onClick={revalidateSite}
      />
    </div>
  );
}

export default RevalidateButton;
