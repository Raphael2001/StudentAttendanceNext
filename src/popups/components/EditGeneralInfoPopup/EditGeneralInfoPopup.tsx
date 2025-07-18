"use client";

import React from "react";

import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";

import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import Api from "api";
import { GeneralInfo } from "utils/types/init";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

type Props = {
  payload: Payload;
  popupIndex: number;
};
type Payload = {
  dataItem: GeneralInfo;
};

function EditGeneralInfoPopup({ payload, popupIndex }: Props) {
  const { dataItem } = payload;
  const { _id, cmsTitle } = dataItem;

  const translate = useCMSTranslate();

  function onSubmit(payload, onSuccess) {
    const data = { _id, cmsTitle: payload["title"] };
    Api.cms.generalInfo.PUT({ payload: data, config: { onSuccess } });
  }

  const formData: FormData = {
    inputs: [
      {
        name: "title",
        label: translate("general_info_title"),
        inputType: FORM_INPUTS_TYPES.INPUT,
        schema: VALIDATION_SCHEMES.RequiredString,
      },
    ],
    initialData: { title: cmsTitle },
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

export default EditGeneralInfoPopup;
