"use client";

import React, { useMemo, useRef, useState } from "react";

import styles from "./MetaTagsPopup.module.scss";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";

import { SlidePopupRef } from "utils/types/popup";
import MetaTagsInputsSelect from "components/Cms/MetaTagsInputsSelect/MetaTagsInputsSelect";
import { copy, generateUniqueId } from "utils/functions";
import { MetaTagRow } from "utils/types/metaTags";
import CmsButton from "components/CmsButton/CmsButton";

import { useAppSelector } from "utils/hooks/useRedux";
import FormCreator from "components/FormCreator/FormCreator";
import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import Api from "api/requests";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";

function MetaTagsPopup(props) {
  const { payload = {} } = props;
  const { dataItem = {} } = payload;
  const [fields, setFields] = useState<Array<MetaTagRow>>(
    dataItem.fields ?? []
  );
  const { onSuccessNotification } = useNotificationsHandler();

  const id = dataItem?._id;

  const ref = useRef<SlidePopupRef>();

  const languages = useAppSelector((store) => store.init.languages);
  const animateOut = () => ref.current?.animateOut();

  function onSubmit(data: Object) {
    const payload = { ...data, fields };

    if (id) {
      payload["id"] = id;

      return Api.updateMetaTags({ payload, onSuccess });
    }

    Api.createMetaTags({ payload, onSuccess });

    function onSuccess() {
      animateOut();
      if (id) {
        onSuccessNotification();
      }
    }
  }

  function setField(id: string, field: string, value: string) {
    const itemsArray: Array<MetaTagRow> = copy(fields);

    const index = itemsArray.findIndex((i: MetaTagRow) => i.metaTagId === id);

    if (index > -1) {
      itemsArray[index] = { ...itemsArray[index], [field]: value };
    }

    setFields(itemsArray);
  }

  function setFieldType(id: string, type: string) {
    setField(id, "type", type);
  }
  function setFieldValue(id: string, value: string) {
    setField(id, "value", value);
  }
  function removeById(id: string) {
    setFields((prevState) =>
      prevState.filter((i: MetaTagRow) => i.metaTagId !== id)
    );
  }

  function addNewMeta() {
    const itemsArray: Array<MetaTagRow> = copy(fields);
    itemsArray.push({
      metaTagId: generateUniqueId(16),
      type: "",
      value: "",
    });
    setFields(itemsArray);
  }

  const inputs = useMemo(() => {
    return [
      {
        name: "route",
        label: "נתיב",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
        isDisabled: !!id,
      },
      {
        name: "langId",
        label: "שפה",
        inputType: FORM_INPUTS_TYPES.SELECT,
        rules: ["not_empty"],
        options: languages ?? [],
        field: "lang",
        isDisabled: !!id,
      },
    ];
  }, [languages]);

  const formData: FormDataType = {
    inputs,
    initialData: useMemo(() => dataItem, []),
  };

  return (
    <SlidePopup ref={ref} className={styles["meta-tags-popup"]}>
      <div className={styles["content"]}>
        <FormCreator
          formData={formData}
          onSubmit={onSubmit}
          buttonText={id ? "עדכון" : "יצירה"}
        >
          {fields.map((item: MetaTagRow) => {
            return (
              <MetaTagsInputsSelect
                key={"inputs" + item.metaTagId}
                id={item.metaTagId}
                setFieldType={setFieldType}
                setFieldValue={setFieldValue}
                remove={removeById}
                valueArray={fields}
              />
            );
          })}
          <div className={styles["actions"]}>
            <CmsButton
              text={"הוספת תגית חדשה"}
              onClick={addNewMeta}
              color="blue"
            />
          </div>
        </FormCreator>
      </div>
    </SlidePopup>
  );
}

export default MetaTagsPopup;
