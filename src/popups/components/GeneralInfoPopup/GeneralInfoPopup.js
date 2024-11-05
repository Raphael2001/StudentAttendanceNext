"use client";

import React from "react";

import GeneralInfoInputTypes from "constants/GeneralInfoInputTypes";

import FORM_INPUTS_TYPES from "constants/form-inputs-types";

import Api from "api/requests";
import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";

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

function GeneralInfoPopup() {
  function onSubmit(formPayload, onSuccess) {
    const multiValuesId = formPayload.multiValues;
    const option = options.find((o) => o._id === multiValuesId);
    const payload = {
      cmsTitle: formPayload.cmsTitle,
      value: option.value,
      name: formPayload.name,
      inputType: formPayload.inputType,
    };
    Api.upsertGeneralInfo({ payload, onSuccess });
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
    <GeneralFormPopup
      formData={formData}
      onSubmit={onSubmit}
      hasDataItem={false}
    />
  );
}

export default GeneralInfoPopup;
