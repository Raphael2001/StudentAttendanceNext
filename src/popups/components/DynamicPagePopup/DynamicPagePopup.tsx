"use client";

import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";
import React, { useMemo } from "react";
import { copy } from "utils/functions";
import useCMSLanguage from "utils/hooks/useCMSLanguage";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import { DynamicPage } from "utils/types/dynamicPages";
import { FormData } from "utils/types/form";

type Payload = {
  dataItem?: DynamicPage;
};

type Props = {
  payload: Payload;
  popupIndex: number;
};

export default function DynamicPagePopup(props: Props) {
  const { payload = {}, popupIndex } = props;
  const { dataItem } = payload;

  const translate = useCMSTranslate();
  const { convertLanguageId, revertLanguage } = useCMSLanguage();

  function transformInitialData(initialData) {
    if (initialData) {
      const data = copy(initialData);
      data["language"] = revertLanguage(data["language"]);
      return data;
    }
    return {};
  }

  function onSubmit(payload, onSuccess) {
    payload["language"] = convertLanguageId(payload["language"]);
    if (dataItem) {
      payload["_id"] = dataItem["_id"];
      Api.cms.dynamicPages.PUT({ payload, config: { onSuccess } });
    } else {
      Api.cms.dynamicPages.POST({ payload, config: { onSuccess } });
    }
  }
  const initialData = useMemo(() => transformInitialData(dataItem), [dataItem]);

  const formData: FormData = {
    inputs: [
      {
        name: "name",
        label: translate("dynamic_page_name"),
        inputType: FORM_INPUTS_TYPES.INPUT,
        schema: VALIDATION_SCHEMES.RequiredString,
      },
      {
        name: "route",
        label: translate("dynamic_page_route"),
        inputType: FORM_INPUTS_TYPES.INPUT,
        schema: VALIDATION_SCHEMES.RequiredString,
      },
      {
        name: "language",
        label: translate("language"),
        inputType: FORM_INPUTS_TYPES.LANGUAGE_SELECT,
        schema: VALIDATION_SCHEMES.RequiredString,
      },
    ],
    initialData,
  };

  return (
    <GeneralFormPopup
      hasDataItem={!!dataItem}
      onSubmit={onSubmit}
      formData={formData}
      popupIndex={popupIndex}
    />
  );
}
