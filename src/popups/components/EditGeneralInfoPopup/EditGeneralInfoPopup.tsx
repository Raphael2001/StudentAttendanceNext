"use client";

import React from "react";

import useGeneralInfo from "utils/hooks/useGeneralInfo";

import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";

import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";

type Props = {
  payload: Payload;
};
type Payload = {
  name: string;
};

function EditGeneralInfoPopup({ payload }: Props) {
  const { name } = payload;

  const { value, cmsTitle, upsertGeneralInfo } = useGeneralInfo(name);

  function onSubmit(payload, onSuccess) {
    upsertGeneralInfo(value, onSuccess, payload["title"]);
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
    <GeneralFormPopup
      hasDataItem={true}
      formData={formData}
      onSubmit={onSubmit}
    />
  );
}

export default EditGeneralInfoPopup;
