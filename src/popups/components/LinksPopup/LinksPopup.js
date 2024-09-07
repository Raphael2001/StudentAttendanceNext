"use client";

import React, { useEffect, useRef, useState } from "react";

import LINKS_TYPES from "constants/LinksTypes";

import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import Api from "api/requests";
import useMultiLangData from "utils/hooks/useMultiLangData";
import { useAppSelector } from "utils/hooks/useRedux";
import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";

function LinksPopup(props) {
  const { payload = {} } = props;
  const { dataItem } = payload;

  const media = useAppSelector((store) => store.init?.media);
  const languages = useAppSelector((store) => store.init?.languages);

  const [formData, setFormData] = useState({ inputs: [] });

  const { initialData, transformPayload } = useMultiLangData(dataItem);

  useEffect(() => {
    const form = {
      inputs: [
        {
          name: "name",
          rules: ["not_empty"],
          label: "שם",
          inputType: FORM_INPUTS_TYPES.INPUT,
        },
        {
          name: "linkType",
          rules: ["not_empty"],
          label: "סוג לינק",
          inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
          options: Object.values(LINKS_TYPES),
        },

        {
          name: "link",
          rules: ["not_empty"],
          label: "לינק",
          inputType: FORM_INPUTS_TYPES.INPUT,
        },
        {
          name: "media",
          rules: ["not_empty"],
          label: "מדיה",
          inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
          options: media ? Object.values(media) : [],
          field: "name",
        },
      ],
      initialData: initialData,
    };

    if (languages) {
      for (const index in languages) {
        const languageData = languages[index];

        const inputData = {
          name: `titles.${languageData._id}`,
          inputType: FORM_INPUTS_TYPES.INPUT,
          label: `כותרת - ${languageData.lang}`,
          rules: ["no_validation"],
        };
        form.inputs.push(inputData);
      }
    }
    setFormData(form);
  }, [languages, initialData, media]);

  function onSubmit(formPayload, onSuccess) {
    const payload = transformPayload(formPayload);

    if (dataItem?._id) {
      payload["id"] = dataItem._id;
    }

    Api.upsertLink({ payload, onSuccess });
  }

  return (
    <GeneralFormPopup
      hasDataItem={!!dataItem}
      formData={formData}
      onSubmit={onSubmit}
    />
  );
}

export default LinksPopup;
