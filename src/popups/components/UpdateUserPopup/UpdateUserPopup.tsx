"use client";

import React, { useRef } from "react";

import styles from "./UpdateUserPopup.module.scss";
import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import FormCreator from "components/FormCreator/FormCreator";
import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";
import Api from "api/requests";
import { UserType } from "utils/types/user";

type Props = {
  payload: Payload;
};

type Payload = {
  dataItem: UserType;
};

function UpdateUserPopup(props: Props) {
  const ref = useRef<SlidePopupRef>();
  const { payload } = props;
  const { dataItem } = payload;

  const roles = useAppSelector((store) => store.init.iamRoles);

  function onSubmit(payload) {
    payload["id"] = dataItem._id;
    Api.updateUser({ payload, onSuccess });
  }

  function onSuccess() {
    ref.current?.animateOut();
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
    <SlidePopup className={styles["update-user-popup"]} ref={ref}>
      <div className={styles["form"]}>
        <FormCreator
          formData={formData}
          buttonText={"עדכן"}
          onSubmit={onSubmit}
        />
      </div>
    </SlidePopup>
  );
}

export default UpdateUserPopup;
