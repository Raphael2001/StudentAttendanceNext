import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import styles from "./BlurPopup.module.scss";
import XIcon from "/public/assets/icons/x-icon.svg";
import { removePopup } from "redux-store/features/popupsSlice";
import { useAppDispatch } from "utils/hooks/useRedux";

const BlurPopupRef = (props, ref) => {
  const {
    showCloseIcon = true,
    children,
    className = "",
    animateOutCallback = () => {},
  } = props;

  const [animationClass, setAminationClass] = useState("");
  const dispatch = useAppDispatch();
  const modalRef = useRef();

  useImperativeHandle(ref, () => ({
    animateOut,
  }));

  const animateIn = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAminationClass("active");
      });
    });
  };
  useEffect(() => {
    animateIn();
  }, []);

  const completeAnimation = () => {
    if (animationClass !== "exit" && animationClass !== "done") {
      setAminationClass("done");
    }
  };
  const animateOut = (callback) => {
    setAminationClass("exit");
    setTimeout(() => {
      if (callback) {
        callback();
      }

      dispatch(removePopup());
    }, 200);
  };

  return (
    <div
      className={`backdrop ${styles["blur-popup"]} ${className} ${styles(
        animationClass
      )} `}
      onClick={() => animateOut(animateOutCallback)}
      onTransitionEnd={completeAnimation}
    >
      <div
        className={`${styles["popup_wrapper"]} ${styles(animationClass)}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {showCloseIcon && (
          <button
            className={styles["close-icon-wrapper"]}
            onClick={() => animateOut(animateOutCallback)}
          >
            <img src={XIcon.src}></img>
          </button>
        )}

        {children && <div className={styles["popup_content"]}>{children}</div>}
      </div>
    </div>
  );
};
const BlurPopup = forwardRef(BlurPopupRef);

export default BlurPopup;
