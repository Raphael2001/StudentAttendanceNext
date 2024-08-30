"use client";

import React, { useRef } from "react";

import styles from "./EditGeneralInfoPopup.module.scss";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";

import useGeneralInfo from "utils/hooks/useGeneralInfo";
import { SlidePopupRef } from "utils/types/popup";
import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import FormCreator from "components/FormCreator/FormCreator";

type Props = {
  payload: Payload;
};
type Payload = {
  name: string;
};

function EditGeneralInfoPopup({ payload }: Props) {
  const { name } = payload;
  const ref = useRef<SlidePopupRef>();

  const { value, cmsTitle, upsertGeneralInfo } = useGeneralInfo(name);

  const animateOut = () => ref.current?.animateOut();

  function onSubmit(payload) {
    upsertGeneralInfo(value, animateOut, payload["title"]);
  }

  const formData: FormDataType = {
    inputs: [
      {
        name: "title",
        label: "כותרת",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
    ],
    initialData: { title: cmsTitle },
  };

  return (
    <SlidePopup className={styles["edit-general-params-popup"]} ref={ref}>
      <div className={styles["content"]}>
        <FormCreator
          formData={formData}
          buttonText={"עדכן"}
          onSubmit={onSubmit}
        />
      </div>
    </SlidePopup>
  );
}

export default EditGeneralInfoPopup;
