"use client";

import React from "react";

import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";
import Api from "api/requests";
import { UserType } from "utils/types/user";
import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";

type Props = {
  payload: Payload;
};

type Payload = {
  dataItem: UserType;
};

function UpdateUserPopup(props: Props) {
  const { payload } = props;
  const { dataItem } = payload;

  const roles = useAppSelector((store) => store.init.iamRoles);

  function onSubmit(payload, onSuccess) {
    payload["id"] = dataItem._id;
    Api.updateUser({ payload, onSuccess });
  }

  const formData: FormDataType = {
    inputs: [
      {
        name: "roleId",
        label: "תפקיד",
        inputType: FORM_INPUTS_TYPES.SELECT,
        options: roles,
        rules: ["not_empty"],
        field: "title",
      },
    ],
    initialData: dataItem,
  };

  return (
    <GeneralFormPopup
      hasDataItem={true}
      formData={formData}
      onSubmit={onSubmit}
    />
  );
}

export default UpdateUserPopup;
