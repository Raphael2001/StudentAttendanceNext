"use client";

import React from "react";

import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";

import Api from "api/requests";

import { Teacher } from "utils/types/teacher";
import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";

type Payload = {
  dataItem?: Teacher;
};

type Props = {
  payload: Payload;
};

export default function TeacherPopup(props: Props) {
  const { payload = {} } = props;
  const { dataItem } = payload;

  function onSubmit(payload, onSuccess) {
    if (dataItem) {
      return Api.updateTeacher({ payload, onSuccess });
    }

    Api.addTeacher({ payload, onSuccess });
  }

  const formData: FormDataType = {
    inputs: [
      {
        name: "_id",
        label: "תעודת זהות",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "name",
        label: "שם מורה",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "schoolName",
        label: "שם ביה״ס",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },

      {
        name: "phone",
        label: "טלפון",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty", "cell"],
      },
      {
        name: "mail",
        label: "מייל",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty", "email"],
      },
    ],
    initialData: dataItem,
  };

  return (
    <GeneralFormPopup
      hasDataItem={!!dataItem}
      formData={formData}
      onSubmit={onSubmit}
    />
  );
}
