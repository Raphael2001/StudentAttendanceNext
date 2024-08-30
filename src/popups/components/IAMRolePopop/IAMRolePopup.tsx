"use client";

import React, { useRef } from "react";

import styles from "./IAMRolePopup.module.scss";
import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import FormCreator from "components/FormCreator/FormCreator";
import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";
import { IAMRoleType } from "utils/types/init";
import Api from "api/requests";

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

  const ref = useRef<SlidePopupRef>();

  function onSubmit(payload) {
    if (dataItem) {
      payload["id"] = dataItem["_id"];
      return Api.updateRole({ payload, onSuccess });
    }

    Api.createRole({ payload, onSuccess });
  }

  function onSuccess() {
    ref.current?.animateOut();
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
        options: modules,
        field: "title",
        bitwiseField: "bitwise",
      },
    ],
    initialData: dataItem,
  };

  return (
    <SlidePopup className={styles["role-popup"]} ref={ref}>
      <div className={styles["form"]}>
        <FormCreator
          formData={formData}
          buttonText={!dataItem ? "הוסף" : "עדכן"}
          onSubmit={onSubmit}
        />
      </div>
    </SlidePopup>
  );
}

export default IAMRolePopup;
