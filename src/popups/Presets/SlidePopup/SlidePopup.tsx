"use client";

import React, { useImperativeHandle, useRef } from "react";

import styles from "./SlidePopup.module.scss";

import { clsx } from "utils/functions";
import Scrollbar from "components/General/ScrollBar/Scrollbar";

import Loader from "components/General/Loader/Loader";
import GestureHandler from "components/General/GestureHandler/GestureHandler";
import useAnimatePopup from "utils/hooks/useAnimatePopup";

type SlidePopupProps = {
  showCloseIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
  animateOutCallback?: () => void;
  popupWrapperClassName?: string;
  popupContentClassName?: string;
  ref?: React.Ref<{ animateOut: (callback?: () => void) => void }>;
  isLoading?: boolean;
  popupIndex: number;
};

function SlidePopup(props: SlidePopupProps) {
  const {
    showCloseIcon = false,
    children,
    className = "",
    animateOutCallback = () => {},
    popupWrapperClassName = "",
    popupContentClassName = "",
    ref,
    isLoading = false,
    popupIndex,
  } = props;

  const modalRef = useRef<HTMLDivElement>(null);

  const { animateOut, completeAnimation, animationClass } = useAnimatePopup({
    popupIndex,
  });

  useImperativeHandle(ref, () => ({
    animateOut,
  }));

  return (
    <div
      className={clsx(styles["slide-popup"], className)}
      onTransitionEnd={completeAnimation}
    >
      <button
        className={clsx(styles["popup-backdrop"], styles[animationClass])}
        onClick={() => animateOut(animateOutCallback)}
      />

      <div
        className={clsx(
          styles["popup-wrapper"],
          styles[animationClass],
          popupWrapperClassName,
        )}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <GestureHandler
          onExit={animateOut}
          ref={modalRef}
          className={styles["gesture"]}
        />
        <Scrollbar
          className={styles["popup-container"]}
          contentClassName={clsx(
            styles["popup-content"],
            popupContentClassName,
          )}
        >
          <>
            {showCloseIcon && (
              <button
                className={styles["close-icon-wrapper"]}
                onClick={() => animateOut(animateOutCallback)}
              >
                <img src={"/assets/icons/close-icon.svg"} alt="Close icon" />
              </button>
            )}
            <Loader show={isLoading} />

            {children}
          </>
        </Scrollbar>
      </div>
    </div>
  );
}

export default SlidePopup;
