"use client";

import React from "react";

import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";

import Api from "api/requests";
import { StudentType } from "utils/types/student";
import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";

type Payload = {
  dataItem?: StudentType;
};

type Props = {
  payload: Payload;
};

function StudentPopup(props: Props) {
  const { payload = {} } = props;
  const { dataItem } = payload;

  const teachers = useAppSelector((store) => store.init.teachers);

  function onSubmit(payload, onSuccess) {
    if (dataItem) {
      return Api.updateStudent({ payload, onSuccess });
    }

    Api.addStudent({ payload, onSuccess });
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
        label: "שם תלמיד",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "className",
        label: "שם כיתה",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "schoolName",
        label: "שם בית ספר",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },

      {
        name: "teacherId",
        label: "מורה",
        inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
        rules: ["not_empty"],
        options: teachers,
        field: "name",
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

export default StudentPopup;
