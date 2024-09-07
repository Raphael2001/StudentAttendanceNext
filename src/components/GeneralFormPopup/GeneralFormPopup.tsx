"use client";

import React, { useRef } from "react";

import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import FormCreator from "components/FormCreator/FormCreator";
import { FormDataType } from "utils/types/form";

import styles from "./GeneralFormPopup.module.scss";
import { FormPayloadType } from "utils/types/general";

type Props = {
  hasDataItem: boolean;
  formData: FormDataType;
  onSubmit: (payload: FormPayloadType, onSuccess: () => void) => void;
};

export default function GeneralFormPopup(props: Props) {
  const { hasDataItem = false, formData, onSubmit } = props;

  const ref = useRef<SlidePopupRef>();

  function onSuccess() {
    ref.current?.animateOut();
  }

  function onSubmitHandler(payload: FormPayloadType) {
    onSubmit(payload, onSuccess);
  }

  return (
    <SlidePopup className={styles["general-form-popup"]} ref={ref}>
      <div className={styles["form"]}>
        <FormCreator
          formData={formData}
          buttonText={!hasDataItem ? "הוסף" : "עדכן"}
          onSubmit={onSubmitHandler}
        />
      </div>
    </SlidePopup>
  );
}
