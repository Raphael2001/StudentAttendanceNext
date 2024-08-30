"use client";

import React, { useRef } from "react";

import styles from "./GeneralInfoPopup.module.scss";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import GeneralInfoInputTypes from "constants/GeneralInfoInputTypes";

import FormCreator from "components/FormCreator/FormCreator";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";

import Api from "api/requests";

const options = [
  {
    _id: "text",
    text: "לא",
    value: "",
  },
  {
    _id: "array",
    text: "כן",
    value: [],
  },
];

function GeneralInfoPopup(props) {
  const ref = useRef();

  function onSubmit(formPayload) {
    const multiValuesId = formPayload.multiValues;
    const option = options.find((o) => o._id === multiValuesId);
    const payload = {
      cmsTitle: formPayload.cmsTitle,
      value: option.value,
      name: formPayload.name,
      inputType: formPayload.inputType,
    };
    Api.upsertGeneralInfo({ payload, onSuccess });

    function onSuccess() {
      ref.current.animateOut();
    }
  }

  const formData = {
    inputs: [
      {
        name: "name",
        rules: ["not_empty", ["alphanumeric", 2]],
        label: "שם השדה (אנגלית בלבד)",
        inputType: FORM_INPUTS_TYPES.INPUT,
      },
      {
        name: "cmsTitle",
        rules: ["not_empty"],
        label: "כותרת השדה",
        inputType: FORM_INPUTS_TYPES.INPUT,
      },
      {
        name: "inputType",
        rules: ["not_empty"],
        label: "סוג שדה",
        inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
        options: Object.values(GeneralInfoInputTypes),
      },
      {
        name: "multiValues",
        rules: ["not_empty"],
        label: "ערך מרובה (לא רלוונטי לטקסט מתחלף)",
        inputType: FORM_INPUTS_TYPES.RADIO,
        options: options,
        field: "text",
      },
    ],
  };

  return (
    <SlidePopup className={styles["general-info-popup"]} ref={ref}>
      <div className={styles["content"]}>
        <FormCreator
          formData={formData}
          buttonText={"יצירה"}
          onSubmit={onSubmit}
        />
      </div>
    </SlidePopup>
  );
}

export default GeneralInfoPopup;
