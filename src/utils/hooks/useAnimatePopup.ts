import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { removePopup } from "redux-store/features/popupsSlice";

type Props = {
  popupIndex: number;
};

export default function useAnimatePopup(props: Props) {
  const { popupIndex } = props;

  const popupsArray = useAppSelector((store) => store.popupsArray);

  const [animationClass, setAnimationClass] = useState("");
  const dispatch = useAppDispatch();

  const lastPopupIndex = popupsArray.length - 1;

  useEffect(() => {
    animateIn();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        animateOut();
      }
    };
    if (lastPopupIndex === popupIndex) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupIndex, lastPopupIndex]);

  const completeAnimation = () => {
    if (animationClass !== "exit" && animationClass !== "done") {
      setAnimationClass("done");
    }
  };

  function animateIn() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimationClass("active");
      });
    });
  }

  function animateOut(callback?: () => void) {
    setAnimationClass("exit");
    setTimeout(() => {
      if (callback) {
        callback();
      }
      dispatch(removePopup());
    }, 200);
  }

  return {
    animateOut,
    completeAnimation,
    animationClass,
  };
}
