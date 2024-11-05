"use client";

import React from "react";

import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";
import Api from "api/requests";
import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";

function CreateUserPopup() {
  const roles = useAppSelector((store) => store.init.iamRoles);

  function onSubmit(payload, onSuccess) {
    Api.createUser({ payload, onSuccess });
  }

  const formData: FormDataType = {
    inputs: [
      {
        name: "username",
        label: "שם משתמש",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty", ["alphanumeric", 4]],
      },
      {
        name: "password",
        label: "סיסמא",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty", "password"],
      },
      {
        name: "roleId",
        label: "תפקיד",
        inputType: FORM_INPUTS_TYPES.SELECT,
        options: roles,
        rules: ["not_empty"],
        field: "title",
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

export default CreateUserPopup;
