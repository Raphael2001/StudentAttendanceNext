"use client";

import React from "react";

import styles from "./contact.module.scss";
import FormCreator from "components/FormCreator/FormCreator";
import useTranslate from "utils/hooks/useTranslate";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { FormDataType } from "utils/types/form";
import POPUP_TYPES from "constants/popup-types";
import usePopup from "utils/hooks/usePopup";

function Contact() {
  const translate = useTranslate();
  const openPopup = usePopup();

  const formData: FormDataType = {
    inputs: [
      {
        name: "fullname",
        label: "שם מלא",
        inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
        rules: ["not_empty", "full_name"],
      },
      {
        name: "phone",
        label: "טלפון",
        inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
        rules: ["not_empty", "phone"],
        type: "tel",
      },
    ],
  };

  function onSubmit(payload: any) {
    openPopup(POPUP_TYPES.LEAD_SENT_SUCCESS, {
      title: translate("leadSentSuccess_title"),
      name: payload.fullname,
      content: translate("leadSentSuccess_content"),
      btnText: translate("leadSentSuccess_btnText"),
    });
  }

  return (
    <div className={styles["contact-page-wrapper"]}>
      <h1 className={styles["title"]}>{translate("contact_us_title")}</h1>
      <h4 className={styles["subtitle"]}>{translate("contact_us_subtitle")}</h4>

      <div className={styles["form"]}>
        <FormCreator
          formData={formData}
          onSubmit={onSubmit}
          buttonText="שליחה"
        />
      </div>
    </div>
  );
}

export default Contact;
