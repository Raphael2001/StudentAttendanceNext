"use client";

import React from "react";

import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import { useAppSelector } from "utils/hooks/useRedux";
import Api from "api";
import { UserType } from "utils/types/user";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

type Props = {
  payload: Payload;
  popupIndex: number;
};

type Payload = {
  dataItem: UserType;
};

function UpdateUserPopup(props: Props) {
  const { payload, popupIndex } = props;
  const { dataItem } = payload;

  const translate = useCMSTranslate();

  const roles = useAppSelector((store) => store.init.iamRoles);

  function onSubmit(payload, onSuccess) {
    payload["_id"] = dataItem._id;
    Api.cms.cmsUsers.PUT({ payload, config: { onSuccess } });
  }

  const formData: FormData = {
    inputs: [
      {
        name: "roleId",
        label: translate("user_role"),
        inputType: FORM_INPUTS_TYPES.SELECT,
        options: roles,
        schema: VALIDATION_SCHEMES.RequiredString,
        field: "title",
      },
    ],
    initialData: dataItem,
  };

  return (
    <GeneralFormPopup
      popupIndex={popupIndex}
      hasDataItem={true}
      formData={formData}
      onSubmit={onSubmit}
    />
  );
}

export default UpdateUserPopup;
