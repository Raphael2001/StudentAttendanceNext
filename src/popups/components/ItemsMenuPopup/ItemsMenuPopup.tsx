"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./ItemsMenuPopup.module.scss";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import { SlidePopupRef } from "utils/types/popup";
import FormCreator from "components/FormCreator/FormCreator";
import { FormDataType, FormInputData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";
import Api from "api/requests";
import useMultiLangData from "utils/hooks/useMultiLangData";
import { CmsItemsMenu } from "utils/types/menus";

type Props = {
  payload: Payload;
};

type Payload = {
  dataItem?: CmsItemsMenu;
};

function ItemsMenuPopup(props: Props) {
  const { payload = {} } = props;

  const { dataItem } = payload;

  const ref = useRef<SlidePopupRef>();

  const languages = useAppSelector((store) => store.init?.languages);
  const items = useAppSelector((store) => store.init.items);

  const [formData, setFormData] = useState<FormDataType>({ inputs: [] });

  const { initialData, transformPayload } = useMultiLangData(dataItem);

  useEffect(() => {
    const form: FormDataType = {
      inputs: [
        {
          name: "name",
          inputType: FORM_INPUTS_TYPES.INPUT,
          label: "שם מוצר",
          rules: ["not_empty"],
        },
        {
          name: "menuId",
          inputType: FORM_INPUTS_TYPES.INPUT,
          label: "מזהה יחודי לתפריט",
          rules: ["not_empty", ["alphanumeric", 2]],
        },
        {
          name: "items",
          inputType: FORM_INPUTS_TYPES.MULTI_SELECT_AUTO_COMPLETE,
          label: "מוצרים",
          rules: ["not_empty"],
          options: items,
          field: "name",
          showDataTable: true,
          enableDrag: true,
          tableHeaderData: [
            { name: "name", title: "שם" },
            { name: "price", title: "מחיר" },
          ],
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
  }, [languages, initialData]);

  function onSubmit(formPayload) {
    const payload = transformPayload(formPayload);

    if (dataItem?._id) {
      payload["id"] = dataItem._id;

      return Api.updateItemsMenu({ payload, onSuccess });
    }

    Api.addItemsMenu({ payload, onSuccess });
  }

  function onSuccess() {
    ref.current?.animateOut();
  }

  return (
    <SlidePopup className={styles["items-menu-popup"]} ref={ref}>
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

export default ItemsMenuPopup;
