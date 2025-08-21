"use client";

import React from "react";

import LINKS_TYPES from "constants/LinksTypes";

import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import Api from "api";
import useMultiLangData from "utils/hooks/useMultiLangData";
import { useAppSelector } from "utils/hooks/useRedux";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useMultiLangInput from "utils/hooks/useMultiLangInput";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import { FormData } from "utils/types/form";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

function LinksPopup(props) {
  const { payload = {}, popupIndex } = props;
  const { dataItem } = payload;

  const media = useAppSelector((store) => store.init.media);
  const getLangInputs = useMultiLangInput();

  const { initialData, transformPayload } = useMultiLangData(dataItem);

  const translate = useCMSTranslate();

  const formData: FormData = {
    inputs: [
      {
        name: "name",
        label: translate("link_name"),
        inputType: FORM_INPUTS_TYPES.INPUT,
        schema: VALIDATION_SCHEMES.RequiredString,
      },
      {
        name: "linkType",
        label: translate("link_type"),
        inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
        options: Object.values(LINKS_TYPES),
        schema: VALIDATION_SCHEMES.RequiredString,
      },
      {
        name: "link",

        label: translate("link"),
        inputType: FORM_INPUTS_TYPES.INPUT,
        schema: VALIDATION_SCHEMES.RequiredString,
      },
      {
        name: "media",
        label: translate("media"),
        inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
        options: media ?? [],
        field: "name",
        schema: VALIDATION_SCHEMES.String,
      },
      ...getLangInputs("titles", translate("lang_title")),
    ],
    initialData: initialData,
  };

  function onSubmit(formPayload, onSuccess) {
    const payload = transformPayload(formPayload);

    if (dataItem) {
      payload["_id"] = dataItem["_id"];
      Api.cms.links.PUT({ payload, config: { onSuccess } });
    } else {
      Api.cms.links.POST({ payload, config: { onSuccess } });
    }
  }

  return (
    <GeneralFormPopup
      hasDataItem={!!dataItem}
      formData={formData}
      onSubmit={onSubmit}
      popupIndex={popupIndex}
    />
  );
}

export default LinksPopup;
