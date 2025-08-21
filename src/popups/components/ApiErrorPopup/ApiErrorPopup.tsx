"use client";
import React from "react";

import LottieAnimation from "components/General/LottieAnimation/LottieAnimation";

import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";

import ErrorAnimation from "animations/error.json";
import styles from "./ApiErrorPopup.module.scss";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

type Props = {
  payload: Payload;
  popupIndex: number;
};
type Payload = {
  title?: string;
  text?: string;
};

function ApiErrorPopup(props: Props) {
  const { payload, popupIndex } = props;

  const translate = useCMSTranslate();

  const {
    title = translate("api_error_title"),
    text = translate("api_error_text"),
  } = payload;

  return (
    <SlidePopup className={styles["api-error-popup"]} popupIndex={popupIndex}>
      <div className={styles["api-error-wrapper"]}>
        <div className={styles["error-animation-wrapper"]}>
          <LottieAnimation animation={ErrorAnimation} autoplay loop />
        </div>

        <div className={styles["texts-wrapper"]}>
          <h4 className={styles["title"]}>{title}</h4>
          <span className={styles["text"]}>{text}</span>
        </div>
      </div>
    </SlidePopup>
  );
}

export default ApiErrorPopup;
