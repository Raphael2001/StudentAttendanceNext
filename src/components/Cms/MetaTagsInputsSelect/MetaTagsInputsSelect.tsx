"use client";

import React from "react";

import styles from "./MetaTagsInputsSelect.module.scss";
import Select from "components/forms/Select/Select";
import META_TAGS_TYPES from "constants/meta-tags-types";
import { GeneralOptionItem, inputEvent } from "utils/types/inputs";
import TextInput from "components/forms/TextInput/TextInput";
import TrashIcon from "/public/assets/icons/trash.svg";
import { MetaTagRow } from "utils/types/metaTags";
import ActionButton from "components/ActionButton/ActionButton";

type Props = {
  id: string;
  remove: (id: string) => void;
  setFieldType: (id: string, type: string) => void;
  setFieldValue: (id: string, value: string) => void;
  valueArray?: Array<MetaTagRow>;
};

function MetaTagsInputsSelect(props: Props) {
  const {
    id = "",
    remove = () => {},
    setFieldType,
    valueArray = [],
    setFieldValue,
  } = props;
  const item = valueArray.find((i) => i.metaTagId === id) ?? {
    type: "",
    id: "",
    value: "",
  };
  const { type, value } = item;

  function onChangeSelect(name: string, option: GeneralOptionItem) {
    setFieldType(name, option._id);
  }

  function onChangeInput(e: inputEvent) {
    const { value, name } = e.target;
    setFieldValue(name, value);
  }

  function onRemove() {
    remove(id);
  }

  return (
    <div className={styles["meta-tags-select"]}>
      <Select
        placeholder="בחירת תגית"
        options={Object.values(META_TAGS_TYPES)}
        field="_id"
        onChange={onChangeSelect}
        value={type}
        className={styles["select"]}
        name={id}
      />
      <TextInput name={id} onChange={onChangeInput} value={value} />
      <div className={styles["actions"]}>
        <ActionButton
          src={TrashIcon.src}
          className={styles["delete-icon"]}
          onClick={onRemove}
        />
      </div>
    </div>
  );
}

export default MetaTagsInputsSelect;
