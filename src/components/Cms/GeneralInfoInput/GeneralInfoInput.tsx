"use client";

import React, { useMemo, useState } from "react";

import styles from "./GeneralInfoInput.module.scss";
import GeneralInfoInputTypes from "constants/GeneralInfoInputTypes";
import TextInput from "components/General/Forms/TextInput/TextInput";
import { InputEvent } from "utils/types/inputs";

import GeneralInfoActions from "../GeneralInfoActions/GeneralInfoActions";

import { RotatingTextItemOption } from "utils/types/rotatingText";
import RotatingTextInputs from "../RotatingTextInputs/RotatingTextInputs";
import {
  GeneralInfo,
  GeneralInfoItem,
  GeneralInfoValue,
} from "utils/types/init";
import { generateUniqueId } from "utils/functions";
import MediaAutoComplete from "components/General/Forms/PreBuiltData/AutoComplete/MediaAutoComplete";
import LinksAutoComplete from "components/General/Forms/PreBuiltData/AutoComplete/LinkAutoComplete";
import FileAutoComplete from "components/General/Forms/PreBuiltData/AutoComplete/FileAutoComplete";

type Props = {
  item: GeneralInfo;
};

function GeneralInfoInput({ item }: Props) {
  const { name, inputType, value } = item;
  const isMultiValues = Array.isArray(value);

  const initialValue = isMultiValues
    ? { _id: "", data: "" }
    : (value ?? { _id: "", data: "" });

  const [currentValue, setCurrentValue] =
    useState<GeneralInfoValue>(initialValue);

  function onChange(e: InputEvent) {
    const { value } = e.target;
    const data = { _id: generateUniqueId(16), data: value };

    setCurrentValue(data);
  }
  function resetValue() {
    setCurrentValue({ _id: "", data: "" });
  }

  function onChangeAutoComplete(name: string, option: any) {
    if (option) {
      const data = { _id: generateUniqueId(16), data: option._id };

      setCurrentValue(data);
    } else {
      setCurrentValue(option);
    }
  }

  function onChangeRotatingText(
    text: string,
    options: Array<RotatingTextItemOption>,
  ) {
    setCurrentValue({
      text: text,
      options: options,
    });
  }

  const formattedValue = useMemo(() => {
    if ((currentValue as GeneralInfoItem) && "data" in currentValue) {
      return currentValue.data;
    }
    return "";
  }, [currentValue]);

  switch (inputType) {
    case GeneralInfoInputTypes.MEDIA._id:
      return (
        <div className={styles["row"]}>
          <MediaAutoComplete
            value={formattedValue}
            onChange={onChangeAutoComplete}
          />
          <GeneralInfoActions
            item={item}
            inputValue={currentValue}
            resetValue={resetValue}
          />
        </div>
      );
    case GeneralInfoInputTypes.FILE._id:
      return (
        <div className={styles["row"]}>
          <FileAutoComplete
            value={formattedValue}
            onChange={onChangeAutoComplete}
          />
          <GeneralInfoActions
            item={item}
            inputValue={currentValue}
            resetValue={resetValue}
          />
        </div>
      );
    case GeneralInfoInputTypes.LINK._id:
      return (
        <div className={styles["row"]}>
          <LinksAutoComplete
            value={formattedValue}
            onChange={onChangeAutoComplete}
          />
          <GeneralInfoActions
            item={item}
            inputValue={currentValue}
            resetValue={resetValue}
          />
        </div>
      );
    case GeneralInfoInputTypes.ROTATING_TEXT._id:
      return (
        <RotatingTextInputs
          item={item}
          onChange={onChangeRotatingText}
          currentValue={currentValue}
        />
      );
    case GeneralInfoInputTypes.TEXT._id:
    default:
      return (
        <div className={styles["row"]}>
          <TextInput onChange={onChange} value={formattedValue} />
          <GeneralInfoActions
            item={item}
            inputValue={currentValue}
            resetValue={resetValue}
          />
        </div>
      );
  }
}

export default GeneralInfoInput;
