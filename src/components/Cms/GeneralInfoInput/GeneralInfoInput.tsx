"use client";

import React, { useEffect, useMemo, useState } from "react";

import styles from "./GeneralInfoInput.module.scss";
import GeneralInfoInputTypes from "constants/GeneralInfoInputTypes";
import TextInput from "components/forms/TextInput/TextInput";
import { inputEvent } from "utils/types/inputs";

import GeneralInfoActions from "../GeneralInfoActions/GeneralInfoActions";

import MediaAutoComplete from "../MediaAutoComplete/MediaAutoComplete";
import useGeneralInfo from "utils/hooks/useGeneralInfo";
import LinksAutoComplete from "../LinksAutoComplete/LinkAutoComplete";
import {
  RotatingTextItem,
  RotatingTextItemOption,
} from "utils/types/rotatingText";
import RotatingTextInputs from "../RotatingTextInputs/RotatingTextInputs";
import { generalInfoItem, generalInfoValue } from "utils/types/init";
import { generateUniqueId } from "utils/functions";
import FileAutoComplete from "../FileAutoComplete/FileAutoComplete";

type Props = {
  name: string;
  id?: string;
};

function GeneralInfoInput({ name, id }: Props) {
  const { multiValues, inputType, value } = useGeneralInfo(name);

  const initialValue = multiValues
    ? { _id: "", data: "" }
    : value ?? { _id: "", data: "" };

  const [currentValue, setCurrentValue] =
    useState<generalInfoValue>(initialValue);

  function onChange(e: inputEvent) {
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
    options: Array<RotatingTextItemOption>
  ) {
    setCurrentValue({
      text: text,
      options: options,
    });
  }

  const formattedValue = useMemo(() => {
    if ((currentValue as generalInfoItem) && "data" in currentValue) {
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
            name={name}
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
            name={name}
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
            name={name}
            inputValue={currentValue}
            resetValue={resetValue}
          />
        </div>
      );
    case GeneralInfoInputTypes.ROTATING_TEXT._id:
      return (
        <RotatingTextInputs
          name={name}
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
            name={name}
            inputValue={currentValue}
            resetValue={resetValue}
          />
        </div>
      );
  }
}

export default GeneralInfoInput;
