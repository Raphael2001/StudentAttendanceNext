"use client";

import React, { useRef } from "react";

import styles from "./CreateUserPopup.module.scss";
import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import FormCreator from "components/FormCreator/FormCreator";
import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";
import Api from "api/requests";

type Props = {};

function CreateUserPopup(props: Props) {
  const ref = useRef<SlidePopupRef>();

  const roles = useAppSelector((store) => store.init.iamRoles);

  function onSubmit(payload) {
    Api.createUser({ payload, onSuccess });
  }

  function onSuccess() {
    ref.current?.animateOut();
  }

  const formData: FormDataType = {
    inputs: [
      {
        name: "username",
        label: "שם משתמש",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty", ["alphanumeric", 4]],
      },
      {
        name: "password",
        label: "סיסמא",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty", "password"],
      },
      {
        name: "roleId",
        label: "תפקיד",
        inputType: FORM_INPUTS_TYPES.SELECT,
        options: roles,
        rules: ["not_empty"],
        field: "title",
      },
    ],
  };

  return (
    <SlidePopup className={styles["create-user-popup"]} ref={ref}>
      <div className={styles["form"]}>
        <FormCreator
          formData={formData}
          buttonText={"הוסף"}
          onSubmit={onSubmit}
        />
      </div>
    </SlidePopup>
  );
}

export default CreateUserPopup;
