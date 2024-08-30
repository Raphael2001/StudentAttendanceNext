"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import styles from "./ItemIngredientsPopup.module.scss";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import { SlidePopupRef } from "utils/types/popup";
import FormCreator from "components/FormCreator/FormCreator";
import { FormDataType, FormInputData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";
import Api from "api/requests";
import useMultiLangData from "utils/hooks/useMultiLangData";
import { CmsIngredient } from "utils/types/menus";

type Props = {
  payload: Payload;
};

type Payload = {
  dataItem?: CmsIngredient;
};

function ItemIngredientsPopup(props: Props) {
  const { payload = {} } = props;
  const { dataItem } = payload;
  const ref = useRef<SlidePopupRef>();

  const languages = useAppSelector((store) => store.init?.languages);
  const media = useAppSelector((store) => store.init?.media);
  const mediaArray = useMemo(
    () => (media ? Object.values(media) : []),
    [media]
  );

  const [formData, setFormData] = useState<FormDataType>({ inputs: [] });

  const { initialData, transformPayload } = useMultiLangData(dataItem);

  useEffect(() => {
    const form: FormDataType = {
      inputs: [
        {
          name: "name",
          inputType: FORM_INPUTS_TYPES.INPUT,
          label: "שם רכיב",
          rules: ["not_empty"],
        },

        {
          name: "price",
          inputType: FORM_INPUTS_TYPES.INPUT,
          label: "מחיר",
          rules: ["not_empty", "price"],
          type: "number",
        },
      ],
      initialData: initialData,
    };

    if (languages) {
      for (const index in languages) {
        const languageData = languages[index];

        const inputData: FormInputData = {
          name: `titles.${languageData._id}`,
          inputType: FORM_INPUTS_TYPES.INPUT,
          label: `כותרת - ${languageData.lang}`,
          rules: ["no_validation"],
        };
        form.inputs.push(inputData);
      }
    }
    setFormData(form);
  }, [languages, initialData, mediaArray]);

  function onSubmit(formPayload) {
    const payload = transformPayload(formPayload);
    if (dataItem?._id) {
      payload["id"] = dataItem._id;
      return Api.updateItemIngredient({ payload, onSuccess });
    }

    Api.addItemIngredient({ payload, onSuccess });
  }

  function onSuccess() {
    ref.current?.animateOut();
  }

  return (
    <SlidePopup className={styles["item-ingredients-popup"]} ref={ref}>
      <div className={styles["form"]}>
        <FormCreator
          formData={formData}
          buttonText={dataItem ? "עדכן" : "הוסף"}
          onSubmit={onSubmit}
        />
      </div>
    </SlidePopup>
  );
}

export default ItemIngredientsPopup;
