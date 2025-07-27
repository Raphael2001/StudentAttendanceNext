"use client";

import React from "react";

import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import { useAppSelector } from "utils/hooks/useRedux";
import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

export default function SyncDBPopup({ popupIndex }: { popupIndex: number }) {
  const syncOptions = useAppSelector((store) => store.init.syncOptions);

  const translate = useCMSTranslate();

  function onSubmit(payload, onSuccess) {
    Api.cms.syncDB.POST({ payload, config: { onSuccess } });
  }

  const formData: FormData = {
    inputs: [
      {
        name: "tables",
        label: translate("db_sync_tables"),
        inputType: FORM_INPUTS_TYPES.CHECKBOXES,
        schema: VALIDATION_SCHEMES.RequiredArray,
        options: syncOptions,
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
      overrideBtnText={translate("db_sync_ok")}
    />
  );
}
