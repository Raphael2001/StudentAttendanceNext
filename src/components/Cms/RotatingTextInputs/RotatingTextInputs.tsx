"use client";

import React, { useState } from "react";

import styles from "./RotatingTextInputs.module.scss";
import TextInput from "components/forms/TextInput/TextInput";

import { inputEvent, optionColorType } from "utils/types/inputs";
import CmsButton from "components/CmsButton/CmsButton";
import TableCreator from "components/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import { generateUniqueId } from "utils/functions";
import { TableAction, TableHeader } from "utils/types/table";

import XIcon from "/public/assets/icons/close-icon.svg";
import {
  RotatingTextItem,
  RotatingTextItemOption,
} from "utils/types/rotatingText";
import Select from "components/forms/Select/Select";
import COLOR_OPTIONS from "constants/ColorOptions";
import useGeneralInfo from "utils/hooks/useGeneralInfo";
import { generalInfoValue } from "utils/types/init";

type Props = {
  name: string;
  currentValue: generalInfoValue;
  onChange: (text: string, options: Array<RotatingTextItemOption>) => void;
};

function isRotatingTextItem(
  value: generalInfoValue
): value is RotatingTextItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "text" in value &&
    "options" in value &&
    Array.isArray((value as RotatingTextItem).options)
  );
}

function RotatingTextInputs({ name, onChange, currentValue }: Props) {
  const { value, upsertGeneralInfo } = useGeneralInfo(name);
  const { options, text } = isRotatingTextItem(currentValue)
    ? currentValue
    : { options: [], text: "" };

  const [newOption, setNewOption] = useState({
    text: {
      value: "",
    },
    color: {
      value: "",
    },
  });

  function onChangeInput(e: inputEvent) {
    const { value } = e.target;

    onChange(value, options);
  }

  function onChangeInputOption(e: inputEvent) {
    const { value } = e.target;
    const newState = { ...newOption };
    newState.text.value = value;
    setNewOption(newState);
  }

  function onChangeSelect(name: string, item: optionColorType) {
    const newState = { ...newOption };
    newState.color.value = item._id;
    setNewOption(newState);
  }

  function addNewOption() {
    const newData: RotatingTextItemOption = {
      text: newOption.text.value,
      _id: generateUniqueId(8),
      color: newOption.color.value,
    };
    onChange(text, [...options, newData]);
    resetNewOption();
  }

  function resetNewOption() {
    const newState = { ...newOption };
    newState.text.value = "";
    newState.color.value = "";
    setNewOption(newState);
  }

  function onDelete(item: RotatingTextItemOption) {
    const updatedOptions = options.filter(
      (option: RotatingTextItemOption) => option._id !== item._id
    );
    onChange(text, updatedOptions);
  }

  function updateValue() {
    upsertGeneralInfo(currentValue);
  }

  const deleteAction: TableAction = {
    icon: XIcon.src,
    onClick: onDelete,
  };

  const tableHeader: TableHeader = {
    text: {
      title: "טקטס",
      type: TABLE_CELL_TYPES.TEXT,
    },
    color: {
      title: "צבע",
      type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
      dataset: COLOR_OPTIONS,
      displayField: "text",
    },
    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [deleteAction],
    },
  };

  return (
    <div className={styles["rotating-texts-inputs-wrapper"]}>
      <div className={styles["row"]}>
        <TextInput
          name="text"
          onChange={onChangeInput}
          value={text}
          placeholder="טקטס קבוע"
        />
        <CmsButton text="עדכון" onClick={updateValue} color="green" />
      </div>
      <div className={styles["row"]}>
        <TextInput
          placeholder="אופציה"
          value={newOption.text.value}
          onChange={onChangeInputOption}
          name="option"
        />
        <Select
          placeholder="צבע"
          options={COLOR_OPTIONS}
          name="color"
          value={newOption.color.value}
          onChange={onChangeSelect}
        />

        <CmsButton
          color="blue"
          text="הוספה"
          onClick={addNewOption}
          isDisabled={!newOption.color.value || !newOption.text.value}
        />
      </div>
      <TableCreator header={tableHeader} data={options} />
    </div>
  );
}

export default RotatingTextInputs;
