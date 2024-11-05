"use client";

import Api from "api/requests";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import React, { useEffect, useRef, useState } from "react";

import styles from "./TextsPopup.module.scss";

import FormCreator from "components/FormCreator/FormCreator";
import { SlidePopupRef } from "utils/types/popup";
import { useAppSelector } from "utils/hooks/useRedux";
import { FormDataType, FormInputData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import TEXT_TAGS from "constants/TextTags";
import { CmsText } from "utils/types/init";

type Props = {
  payload: Payload;
};

type Payload = {
  dataItem?: CmsText;
};

function TextsPopup(props: Props) {
  const { dataItem } = props.payload;
  const languages = useAppSelector((store) => store.init?.languages);
  const ref = useRef<SlidePopupRef>();

  const [formData, setFormData] = useState<FormDataType>({ inputs: [] });

  const isNew = !dataItem;

  useEffect(() => {
    const form: FormDataType = {
      inputs: [
        {
          name: "key",
          inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
          label: "מפתח",
          rules: ["not_empty"],
        },
      ],
    };

    for (const index in languages) {
      const languageData = languages[index];

      const inputData: FormInputData = {
        name: languageData._id,
        inputType: FORM_INPUTS_TYPES.ANIMATED_AUTO_GROW_TEXT_AREA,
        label: languageData.lang,
        rules: ["not_empty"],
      };
      form.inputs.push(inputData);
    }

    form.initialData = formatDataToInitialData(dataItem);

    setFormData(form);
  }, []);

  function formatDataToInitialData(text) {
    if (text) {
      const data = { key: text.key, tag: text.tag };
      for (const key in text.value) {
        data[key] = text.value[key];
      }
      return data;
    }
    return undefined;
  }

  function onSuccess() {
    ref.current?.animateOut();
  }

  function upsertText(payload) {
    Api.upsertText({ payload, onSuccess });
  }

  function onSubmit(formPayload) {
    const key = formPayload.key;
    delete formPayload.key;
    const tag = formPayload.tag;
    delete formPayload.tag;

    const payload = {
      key,
      tag,
      value: formPayload,
    };

    upsertText(payload);
  }

  return (
    <SlidePopup className={styles["texts-popup"]} ref={ref}>
      <div className={styles["content"]}>
        <span className={styles["texts-title"]}>תרגומים</span>
        <div className={styles["form"]}>
          <FormCreator
            formData={formData}
            buttonText={isNew ? "הוסף" : "עדכן"}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </SlidePopup>
  );
}

export default TextsPopup;
