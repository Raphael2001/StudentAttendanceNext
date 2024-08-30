"use client";

import React, { useEffect, useMemo, useState } from "react";

import styles from "./IngredientsMenuForm.module.scss";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { FormDataType, FormInputData } from "utils/types/form";
import { useAppSelector } from "utils/hooks/useRedux";
import useMultiLangData from "utils/hooks/useMultiLangData";
import FormCreator from "components/FormCreator/FormCreator";
import Api from "api/requests";
import { useRouter } from "next/navigation";
import { Routes } from "constants/routes";
import { CmsIngredientMenu } from "utils/types/menus";

type Props = {
  menu?: CmsIngredientMenu;
};

const options = [
  {
    _id: "false",
    text: "לא",
    value: false,
  },
  {
    _id: "true",
    text: "כן",
    value: true,
  },
];

function ItemIngredientsMenuForm(props: Props) {
  const { menu } = props;

  const languages = useAppSelector((store) => store.init?.languages);
  const itemIngredients = useAppSelector(
    (store) => store.init?.itemIngredients
  );

  const router = useRouter();

  const [formData, setFormData] = useState<FormDataType>({ inputs: [] });

  const { initialData, transformPayload } = useMultiLangData(menu);

  const initialDataFormatted = useMemo(() => {
    if (initialData) {
      if ("isFree" in initialData) {
        const isFreeValue = initialData.isFree;
        const isFree = options.find((option) => option.value === isFreeValue);
        initialData.isFree = isFree?._id;
      }
    }
    return initialData;
  }, [initialData]);

  useEffect(() => {
    const form: FormDataType = {
      inputs: [
        {
          name: "name",
          inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
          label: "שם תפריט",
          rules: ["not_empty"],
        },

        {
          name: "minOptions",
          inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
          label: "מינימום אופציות",
          rules: ["not_empty"],
          type: "number",
        },
        {
          name: "maxOptions",
          inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
          label: "מקסימום אופציות",
          rules: ["not_empty"],
          type: "number",
        },
        {
          name: "isFree",
          inputType: FORM_INPUTS_TYPES.RADIO,
          label: "האם תפריט חינם",
          rules: ["not_empty"],
          options: options,
          field: "text",
        },
        {
          name: "ingredients",
          inputType: FORM_INPUTS_TYPES.MULTI_SELECT_AUTO_COMPLETE,
          label: "רכיבים",
          rules: ["not_empty"],
          options: itemIngredients,
          field: "name",
          showDataTable: true,
          enableDrag: true,
          tableHeaderData: [
            { name: "name", title: "שם" },
            { name: "price", title: "מחיר" },
          ],
        },
      ],
      initialData: initialDataFormatted,
    };

    if (languages) {
      for (const index in languages) {
        const languageData = languages[index];

        const inputData: FormInputData = {
          name: `titles.${languageData._id}`,
          inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
          label: `כותרת - ${languageData.lang}`,
          rules: ["no_validation"],
        };
        form.inputs.push(inputData);
      }

      for (const index in languages) {
        const languageData = languages[index];

        const inputData: FormInputData = {
          name: `subtitles.${languageData._id}`,
          inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
          label: `תת כותרת - ${languageData.lang}`,
          rules: ["no_validation"],
        };
        form.inputs.push(inputData);
      }
    }
    setFormData(form);
  }, [languages, initialDataFormatted, itemIngredients]);

  function onSubmit(formPayload) {
    const payload = transformPayload(formPayload);
    if ("isFree" in payload) {
      const isFreeId = payload.isFree;
      const option = options.find((o) => o._id === isFreeId);
      payload.isFree = option?.value;
    }

    if (menu) {
      payload["id"] = menu._id;
      return Api.updateIngredientsMenu({ payload, onSuccess });
    }

    function onSuccess() {
      router.push(Routes.cmsIngredientsMenu);
    }
    Api.addIngredientsMenu({ payload, onSuccess });
  }

  return (
    <div className={styles["menu-form-wrapper"]}>
      <div className={styles["form-content"]}>
        {languages && (
          <FormCreator
            formData={formData}
            buttonText={menu ? "עדכון" : "יצירה"}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default ItemIngredientsMenuForm;
