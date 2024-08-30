"use client";

import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import styles from "./SlidePopup.module.scss";
import XIcon from "/public/assets/icons/close-icon.svg";
import { clsx } from "utils/functions";
import Scrollbar from "components/ScrollBar/Scrollbar";
import { removePopup } from "redux-store/features/popupsSlice";
import { useAppDispatch } from "utils/hooks/useRedux";

const SlidePopupRef = (props, ref) => {
  const {
    showCloseIcon = false,
    children,
    className = "",
    animateOutCallback = () => {},
    popupWrapperClassName = "",
    popupContentClassName = "",
  } = props;

  const [animationClass, setAminationClass] = useState("");
  const dispatch = useAppDispatch();
  const modalRef = useRef();
  const initialY = useRef();

  useImperativeHandle(ref, () => ({
    animateOut,
  }));

  useEffect(() => {
    animateIn();
  }, []);

  const completeAnimation = () => {
    if (animationClass !== "exit" && animationClass !== "done") {
      setAminationClass("done");
    }
  };

  function animateIn() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAminationClass("active");
      });
    });
  }
  const animateOut = (callback) => {
    setAminationClass("exit");
    setTimeout(() => {
      if (callback) {
        callback();
      }

      dispatch(removePopup());
    }, 200);
  };

  function handleOnTouchStart(e) {
    // Get TouchEvent ClientY

    const clientY = Math.round(e.changedTouches[0].clientY);

    initialY.current = clientY;
  }

  function handleOnTouchRelease(e) {
    const clientY = e.changedTouches[0].clientY;

    if (window.innerHeight - window.innerHeight / 5 <= clientY) {
      animateOut();
    } else {
      modalRef.current.style.top = `0px`;
    }
  }

  function onTouchMove(e) {
    const clientY = e.changedTouches[0].clientY;
    if (clientY > initialY.current) {
      modalRef.current.style.top = `${Math.abs(initialY.current - clientY)}px`;
    }
  }

  return (
    <div
      className={clsx(
        "backdrop",
        styles["slide-popup"],
        className,
        animationClass
      )}
      onClick={() => animateOut(animateOutCallback)}
      onTransitionEnd={completeAnimation}
    >
      <div
        className={clsx(
          styles["popup_wrapper"],
          styles[animationClass],
          popupWrapperClassName
        )}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <div
          className={styles["gesture-handler"]}
          onTouchMove={(e) => onTouchMove(e)}
          onTouchEnd={(e) => handleOnTouchRelease(e)}
          onTouchStart={(e) => handleOnTouchStart(e)}
        />
        <Scrollbar
          className={styles["popup-container"]}
          contentClassName={clsx(
            styles["popup-content"],
            popupContentClassName
          )}
        >
          {showCloseIcon && (
            <button
              className={styles["close-icon-wrapper"]}
              onClick={() => animateOut(animateOutCallback)}
            >
              <img src={XIcon.src}></img>
            </button>
          )}
          {children}
        </Scrollbar>
      </div>
    </div>
  );
};
const SlidePopup = forwardRef(SlidePopupRef);

export default SlidePopup;
