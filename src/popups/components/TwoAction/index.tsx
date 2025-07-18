import SlidePopup from "../../Presets/SlidePopup/SlidePopup";
import styles from "./index.module.scss";
import { useRef } from "react";
import CmsButton from "../../../components/Cms/CmsButton/CmsButton";
import { SlidePopupRef } from "utils/types/popup";

const TwoActionPopup = (props) => {
  const { payload = {}, popupIndex } = props;
  const { message, primaryText, secondaryText } = payload;

  const ref = useRef<SlidePopupRef>(null);

  const onButtonClick = (e, isPrimary = false) => {
    e.preventDefault();
    const { onPrimaryClick = () => {}, onSecondaryClick = () => {} } = payload;
    ref?.current?.animateOut(isPrimary ? onPrimaryClick : onSecondaryClick);
  };

  return (
    <SlidePopup
      ref={ref}
      className={styles["two-action-popup"]}
      popupIndex={popupIndex}
    >
      <h2 className={styles["message"]}>{message}</h2>
      <div className={styles["actions-wrapper"]}>
        <CmsButton text={primaryText} onClick={(e) => onButtonClick(e, true)} />
        <CmsButton
          text={secondaryText}
          onClick={(e) => onButtonClick(e, false)}
        />
      </div>
    </SlidePopup>
  );
};

export default TwoActionPopup;
