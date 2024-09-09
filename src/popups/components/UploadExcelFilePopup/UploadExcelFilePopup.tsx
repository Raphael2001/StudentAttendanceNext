"use client";

import React from "react";

import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";

import Api from "api/requests";
import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";

type Payload = {
  moduleName: string;
};

type Props = {
  payload: Payload;
};

export default function UploadExcelFilePopup(props: Props) {
  const { payload } = props;
  const { moduleName } = payload;

  function onSubmit(payload, onSuccess) {
    payload.moduleName = moduleName;
    Api.uploadExcelFile({ payload, onSuccess });
  }

  const formData: FormDataType = {
    inputs: [
      {
        name: "file",
        label: "בחרו קובץ",
        inputType: FORM_INPUTS_TYPES.FILE_UPLOAD,
        rules: ["not_empty"],
        accept: ".xlsx",
      },
    ],
  };

  return (
    <GeneralFormPopup
      hasDataItem={false}
      formData={formData}
      onSubmit={onSubmit}
    />
  );
}
