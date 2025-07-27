"use client";

import React from "react";

import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import { useAppSelector } from "utils/hooks/useRedux";
import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

function CreateUserPopup({ popupIndex }: { popupIndex: number }) {
  const roles = useAppSelector((store) => store.init.iamRoles);
  const translate = useCMSTranslate();

  function onSubmit(payload, onSuccess) {
    Api.cms.cmsUsers.POST({ payload, config: { onSuccess } });
  }

  const formData: FormData = {
    inputs: [
      {
        name: "username",
        label: translate("username"),
        inputType: FORM_INPUTS_TYPES.INPUT,
        schema: VALIDATION_SCHEMES.Username,
      },
      {
        name: "password",
        label: translate("password"),
        inputType: FORM_INPUTS_TYPES.INPUT,
        schema: VALIDATION_SCHEMES.Password,
      },
      {
        name: "roleId",
        label: translate("user_role"),
        inputType: FORM_INPUTS_TYPES.SELECT,
        options: roles,
        schema: VALIDATION_SCHEMES.RequiredString,
        field: "title",
      },
    ],
  };

  return (
    <GeneralFormPopup
      popupIndex={popupIndex}
      formData={formData}
      onSubmit={onSubmit}
      hasDataItem={false}
    />
  );
}

export default CreateUserPopup;
