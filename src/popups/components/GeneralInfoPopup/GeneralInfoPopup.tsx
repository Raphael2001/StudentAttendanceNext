"use client";

import React from "react";

import GeneralInfoInputTypes from "constants/GeneralInfoInputTypes";

import FORM_INPUTS_TYPES from "constants/FormInputsTypes";

import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import { FormData } from "utils/types/form";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

function GeneralInfoPopup({ popupIndex }: { popupIndex: number }) {
  const translate = useCMSTranslate();

  const options = [
    {
      _id: "text",
      text: translate("multi_value_no"),
      value: "",
    },
    {
      _id: "array",
      text: translate("multi_value_yes"),
      value: [],
    },
  ];

  function onSubmit(formPayload, onSuccess) {
    const multiValuesId = formPayload.multiValues;
    const option = options.find((o) => o._id === multiValuesId);
    if (option) {
      const payload = {
        cmsTitle: formPayload.cmsTitle,
        value: option.value,
        name: formPayload.name,
        inputType: formPayload.inputType,
      };
      Api.cms.generalInfo.POST({ payload, config: { onSuccess } });
    }
  }

  const formData: FormData = {
    inputs: [
      {
        name: "name",
        schema: VALIDATION_SCHEMES.GeneralInfoName,
        label: translate("field_name"),
        inputType: FORM_INPUTS_TYPES.INPUT,
      },
      {
        name: "cmsTitle",
        schema: VALIDATION_SCHEMES.RequiredString,
        label: translate("field_title"),
        inputType: FORM_INPUTS_TYPES.INPUT,
      },
      {
        name: "inputType",
        schema: VALIDATION_SCHEMES.RequiredString,
        label: translate("field_type"),
        inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
        options: Object.values(GeneralInfoInputTypes),
      },
      {
        name: "multiValues",
        schema: VALIDATION_SCHEMES.RequiredString,
        label: translate("multi_value_text"),
        inputType: FORM_INPUTS_TYPES.RADIO,
        options: options,
        field: "text",
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

export default GeneralInfoPopup;
