"use client";

import React, { useRef } from "react";

import styles from "./TrashPopup.module.scss";
import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import LottieAnimation from "components/LottieAnimation/LottieAnimation";

import TrashAnimation from "animations/trash.json";
import { clsx } from "utils/functions";

type Props = {
  payload: Payload;
};

type Payload = {
  title: string;
  onClickDelete: (callback: () => void) => void;
};

function TrashPopup(props: Props) {
  const ref = useRef<SlidePopupRef>();

  const { payload } = props;
  const { title, onClickDelete } = payload;

  const animateOut = () => ref.current?.animateOut();

  function onClickHandler() {
    onClickDelete(animateOut);
  }

  return (
    <SlidePopup className={styles["trash-popup"]} ref={ref}>
      <div className={styles["content"]}>
        <div className={styles["animation-wrapper"]}>
          <LottieAnimation animation={TrashAnimation} autoplay loop />
        </div>
        <span className={styles["title"]}>{title}</span>
        <span className={styles["discliamer"]}>פעולה זו בלתי הפיכה</span>

        <div className={styles["actions"]}>
          <button
            className={clsx(styles["button"], styles["ok"])}
            onClick={onClickHandler}
          >
            אישור
          </button>
          <button
            className={clsx(styles["button"], styles["cancel"])}
            onClick={animateOut}
          >
            ביטול
          </button>
        </div>
      </div>
    </SlidePopup>
  );
}

export default TrashPopup;
