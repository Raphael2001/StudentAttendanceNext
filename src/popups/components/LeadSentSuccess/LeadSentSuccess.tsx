"use client";

import React, { useRef } from "react";

import styles from "./LeadSentSuccess.module.scss";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";

import { SlidePopupRef } from "utils/types/popup";
import { Button } from "components/Button/Button";
type Props = {
  payload: Payload;
};

type Payload = {
  title: string;
  content: string;
  name: string;
  btnText: string;
};
export default function LeadSentSuccess(props: Props) {
  const { payload } = props;
  const { title, content, name, btnText } = payload;
  const ref = useRef<SlidePopupRef>();

  const animateOut = () => ref.current?.animateOut();

  return (
    <SlidePopup className={styles["lead-sent-popup"]} ref={ref}>
      <div className={styles["lead-sent-container"]}>
        <h2 className={styles["title"]}>
          {title} <span className={styles["name"]}>{name}</span>
        </h2>
        <p className={styles["content"]}>{content}</p>
        <Button text={btnText} onClick={animateOut} className={styles["btn"]} />
      </div>
    </SlidePopup>
  );
}
