"use client";

import React, { useEffect, useState } from "react";

import styles from "./MetaTagsForm.module.scss";
import FormCreator from "components/General/FormCreator/FormCreator";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import CmsButton from "../CmsButton/CmsButton";
import { FormData, FormInputData, Inputs } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import { generateUniqueId, isValidArray } from "utils/functions";
import Select from "components/General/Forms/Select/Select";
import { GeneralOptionItem } from "utils/types/inputs";
import META_TAGS_TYPES from "constants/MetaTagsTypes";
import { useAppSelector } from "utils/hooks/useRedux";
import { MetaTagField, MetaTags } from "utils/types/metaTags";
import Api from "api";
import { useRouter } from "next/navigation";
import { Routes } from "constants/routes";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

type Props = {
  metaTagId?: string;
};

const options = Object.values(META_TAGS_TYPES);

export default function MetaTagsForm(props: Props) {
  const { metaTagId } = props;
  const translate = useCMSTranslate();
  const languages = useAppSelector((store) => store.init.languages);
  const metaTags = useAppSelector((store) => store.init.metaTags);

  const router = useRouter();

  const [inputs, setInputs] = useState<Inputs>([]);
  const [tagChooser, setTagChooser] = useState("");

  useEffect(() => {
    if (!isValidArray(languages) || !isValidArray(metaTags)) return;

    const pageData = metaTags.find((page) => page._id === metaTagId);

    const langInput: FormInputData = {
      name: "langId",
      label: translate("metaTags_lang"),
      inputType: FORM_INPUTS_TYPES.SELECT,
      schema: VALIDATION_SCHEMES.RequiredString,
      options: languages,
      field: "lang",
    };

    const routeInput: FormInputData = {
      name: "route",
      label: translate("metaTags_route"),
      inputType: FORM_INPUTS_TYPES.INPUT,
      schema: VALIDATION_SCHEMES.RequiredString,
    };

    const inputs: Inputs = [[routeInput, langInput]];

    if (pageData) {
      const langId = languages.find((l) => l.langId === pageData.language)?._id;

      if (langId) {
        langInput.initialValue = langId;
      }
      routeInput.initialValue = pageData.route;

      inputs.push(...revertPayload(pageData));
    }

    setInputs(inputs);
  }, [languages, metaTags]);

  function onSubmit(formPayload) {
    const payload = transformForm(formPayload);

    if (metaTagId) {
      payload["_id"] = metaTagId;
      Api.cms.metaTags.PUT({ payload, config: { onSuccess } });
    } else {
      Api.cms.metaTags.POST({ payload, config: { onSuccess } });
    }

    function onSuccess() {
      router.push(Routes.cmsMetaTags);
    }
    return false;
  }

  const formData: FormData = {
    inputs,
  };

  function onChangeSelect(name: string, option: GeneralOptionItem) {
    setTagChooser(option._id);
  }

  function onDeleteInput(newForm: FormData) {
    setInputs(newForm.inputs);
  }

  function onAddClick() {
    const id = generateUniqueId(16);
    const name = `${id}-${tagChooser}`;

    const item: FormInputData = {
      inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
      schema: VALIDATION_SCHEMES.RequiredString,
      label: tagChooser,
      showDeleteInputButton: true,
      id,
      name,
    };
    setInputs((prevInputs) => {
      return [...prevInputs, item];
    });
    setTagChooser("");
  }

  function transformForm(form) {
    const langId = languages.find((l) => l._id === form.langId)?.langId;

    const payload: {
      route: string;
      language: string;
      fields: MetaTagField[];
    } = {
      route: form.route,
      language: langId ?? "",
      fields: [],
    };

    for (const key in form) {
      if (key.includes("-")) {
        const value = form[key];
        const [tagId, tagType] = key.split("-");

        const field: MetaTagField = {
          _id: tagId,
          type: tagType,
          value,
        };
        payload.fields.push(field);
      }
    }

    return payload;
  }

  function revertPayload(payload: MetaTags) {
    const fields: MetaTagField[] = payload.fields;
    const inputs: FormInputData[] = [];
    for (const field of fields) {
      const item: FormInputData = {
        inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
        schema: VALIDATION_SCHEMES.RequiredString,
        label: field.type,
        showDeleteInputButton: true,
        initialValue: field.value,
        name: `${field._id}-${field.type}`,
      };
      inputs.push(item);
    }
    return inputs;
  }

  if (inputs.length === 0) {
    return null;
  }

  return (
    <div className={styles["meta-tags-form"]}>
      <FormCreator
        buttonText={
          metaTagId ? translate("update_action") : translate("add_action")
        }
        onSubmit={onSubmit}
        formData={formData}
        onDeleteInput={onDeleteInput}
      >
        <div className={styles["add-tag-wrapper"]}>
          <Select
            placeholder={translate("choose_metaTag")}
            options={options}
            onChange={onChangeSelect}
            value={tagChooser}
            className={styles["add-tag-select"]}
            field="_id"
          />
          <CmsButton
            isDisabled={!tagChooser}
            text={translate("add_tag")}
            onClick={onAddClick}
          />
        </div>
      </FormCreator>
    </div>
  );
}
