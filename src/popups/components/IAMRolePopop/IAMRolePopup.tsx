"use client";

import React, { useMemo } from "react";

import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";
import { IAMRoleType } from "utils/types/init";
import Api from "api/requests";
import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";

type Payload = {
  dataItem?: IAMRoleType;
};

type Props = {
  payload: Payload;
};

function IAMRolePopup(props: Props) {
  const { payload = {} } = props;
  const { dataItem } = payload;

  const modules = useAppSelector((store) => store.init.modules);
  const filteredModules = useMemo(
    () => modules.filter((item) => item.show !== false),
    [modules]
  );

  function onSubmit(payload, onSuccess) {
    if (dataItem) {
      payload["id"] = dataItem["_id"];
      return Api.updateRole({ payload, onSuccess });
    }

    Api.createRole({ payload, onSuccess });
  }

  const formData: FormDataType = {
    inputs: [
      {
        name: "title",
        label: "שם התפקיד",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "permissionBitwise",
        label: "הרשאות",
        inputType: FORM_INPUTS_TYPES.BITWISE_CHECKBOX,
        rules: ["not_empty"],
        options: filteredModules,
        field: "title",
        bitwiseField: "bitwise",
      },
    ],
    initialData: dataItem,
  };

  return (
    <GeneralFormPopup
      hasDataItem={!!dataItem}
      onSubmit={onSubmit}
      formData={formData}
    />
  );
}

export default IAMRolePopup;
