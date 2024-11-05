"use client";

import React from "react";

import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";

import Api from "api/requests";

import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";
import { Instructor } from "utils/types/instructor";

type Payload = {
  dataItem?: Instructor;
};

type Props = {
  payload: Payload;
};

export default function InstructorPopup(props: Props) {
  const { payload = {} } = props;
  const { dataItem } = payload;

  function onSubmit(payload, onSuccess) {
    if (dataItem) {
      return Api.updateInstructor({ payload, onSuccess });
    }

    Api.addInstructor({ payload, onSuccess });
  }

  const formData: FormDataType = {
    inputs: [
      {
        name: "_id",
        label: "תעודת זהות",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
        isDisabled: !!dataItem,
      },
      {
        name: "name",
        label: "שם מדריך",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },

      {
        name: "phone",
        label: "טלפון",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty", "cell"],
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
