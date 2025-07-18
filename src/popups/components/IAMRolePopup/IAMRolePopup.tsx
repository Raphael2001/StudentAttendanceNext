"use client";

import React, { useMemo } from "react";

import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import { useAppSelector } from "utils/hooks/useRedux";
import { IAMRole } from "utils/types/init";
import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

type Payload = {
  dataItem?: IAMRole;
};

type Props = {
  payload: Payload;
  popupIndex: number;
};

function IAMRolePopup(props: Props) {
  const { payload = {}, popupIndex } = props;
  const { dataItem } = payload;

  const translate = useCMSTranslate();

  const modules = useAppSelector((store) => store.init.modules);
  const formattedModules = modules.map((module) => {
    return {
      _id: module._id,
      title: module.title || module.route?.title || "",
      bitwise: module.bitwise,
    };
  });

  function onSubmit(payload, onSuccess) {
    if (dataItem) {
      payload["_id"] = dataItem["_id"];
      return Api.cms.iamRoles.PUT({ payload, config: { onSuccess } });
    }

    Api.cms.iamRoles.POST({ payload, config: { onSuccess } });
  }

  const formData: FormData = {
    inputs: [
      {
        name: "title",
        label: translate("role_name"),
        inputType: FORM_INPUTS_TYPES.INPUT,
        schema: VALIDATION_SCHEMES.Title,
      },
      {
        name: "permissionBitwise",
        label: translate("role_permissions"),
        inputType: FORM_INPUTS_TYPES.BITWISE_CHECKBOX,
        schema: VALIDATION_SCHEMES.RequiredNumber,
        options: formattedModules,
        field: "title",
        bitwiseField: "bitwise",
      },
    ],
    initialData: dataItem,
  };

  return (
    <GeneralFormPopup
      popupIndex={popupIndex}
      hasDataItem={!!dataItem}
      onSubmit={onSubmit}
      formData={formData}
    />
  );
}

export default IAMRolePopup;
