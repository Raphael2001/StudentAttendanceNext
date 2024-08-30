"use client";

import React, { useEffect, useMemo, useState } from "react";

import styles from "./InputsCreator.module.scss";

import { inputEvent } from "utils/types/inputs";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import TextInput from "components/forms/TextInput/TextInput";
import AutoComplete from "components/forms/AutoComplete/AutoComplete";
import RadioButtons from "components/forms/RadioButtons/RadioButtons";
import {
  FormInputData,
  TimePickerValue,
  onChangeValue,
} from "utils/types/form";
import Select from "components/forms/Select/Select";
import AnimatedInput from "components/forms/AnimatedInput";
import BasicTextArea from "components/Basic/BasicTextArea/BasicTextArea";
import AnimateTextArea from "components/forms/AnimatedTextArea/AnimatedTextArea";
import AutoGrowTextArea from "components/forms/AutoGrowTextArea/AutoGrowTextArea";
import AnimatedAutoGrowTextArea from "components/forms/AnimatedAutoGrowTextArea/AnimatedAutoGrowTextArea";
import UploadFileButton from "components/forms/UploadFileButton/UploadFileButton";
import ChexkBoxs from "components/forms/ChexkBoxs/ChexkBoxs";
import BitwiseCheckbox from "components/forms/ChexkBoxs/BitwiseCheckboxs";
import MultiSelectAutoComplete from "components/forms/MultiSelectAutoComplete/MultiSelectAutoComplete";
import { generalServerItem } from "utils/types/general";
import TableCreator from "components/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import TimePicker from "components/forms/TimePicker/TimePicker";
import CustomDatePicker from "components/forms/DatePicker/CustomDatePicker";
import BorderInput from "components/forms/BorderInput/BorderInput";

type Props = {
  input: FormInputData;
  onChange: (name: string, value: onChangeValue) => void;
  showError: (name: string) => boolean;
  value:
    | string
    | Array<string | generalServerItem>
    | number
    | File
    | TimePickerValue
    | Date;
  errorMessage?: string;
};

function InputsCreator(props: Props) {
  const { input, showError, onChange, value, errorMessage = "" } = props;
  const {
    inputType,
    label,
    name,
    options = [],
    field = "text",
    isDisabled = false,
    rows = 10,
    type = "text",
    accept = "*",
    ariaLabel,
    required,
    bitwiseField = "bitwise",
    showDataTable = false,
    tableHeaderData = [],
    enableDrag = false,
    endHour,
    minuteInterval,
    startHour,
    endYear,
    minDate,
    startYear,
    title,
  } = input;

  const [tableHeader, setTableHeader] = useState({});

  const optionsItems = useMemo(() => {
    if (Array.isArray(options) && Array.isArray(value)) {
      const filteredOptions = options.filter((item) =>
        value.includes(item._id)
      );
      const sortedOptions = value
        .map((id) => filteredOptions.find((item) => item._id === id))
        .filter((item) => item);
      return sortedOptions;
    }
    return [];
  }, [options, value]);

  useEffect(() => {
    if (tableHeaderData && showDataTable) {
      const data = {};
      for (const item of tableHeaderData) {
        const itemData = {
          title: item.title,
          type: TABLE_CELL_TYPES.TEXT,
        };
        data[item.name] = itemData;
      }
      setTableHeader(data);
    }
  }, [tableHeaderData]);

  function onChangeInput(e: inputEvent) {
    const { name, value } = e.target;
    onChange(name, value);
  }

  function onChangeAutoComplete(name: string, option: generalServerItem) {
    if (option) {
      onChange(name, option._id);
    } else {
      onChange(name, "");
    }
  }

  function onChangeRadio(e: inputEvent) {
    const { id, name } = e.target;

    onChange(name, id);
  }

  function onChangeCheckbox(e: inputEvent) {
    const { id, name } = e.target;

    if (Array.isArray(value)) {
      let newData = [...value];
      if (Array.isArray(value) && value.includes(id)) {
        // remove from array
        newData = newData.filter((t) => t !== id);
      } else {
        newData.push(id);
      }

      onChange(name, newData);
    }
  }

  function onChangeOptionsBitwise(e: inputEvent) {
    const { id, name } = e.target;
    const option = options.find((o) => o._id === id);

    const bitwiseValue = Number(option[bitwiseField]);
    const valueAsNumber = Number(value);

    if (bitwiseValue & valueAsNumber) {
      onChange(name, valueAsNumber - bitwiseValue);
    } else {
      onChange(name, valueAsNumber + bitwiseValue);
    }
  }

  function onChangeMultiSelect(name: string, option: generalServerItem) {
    if (option) {
      const id = option._id;
      if (Array.isArray(value)) {
        if (value.includes(id)) {
          const data = value.filter((o) => o !== id);
          return onChange(name, data);
        } else {
          return onChange(name, [...value, id]);
        }
      }
      return onChange(name, [id]);
    }
    return onChange(name, []);
  }

  function onFileChange(e: inputEvent) {
    const fileList = e.target.files;
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        return onChange(name, file);
      }
    }
  }

  function onChangeItemsPostion(data: Array<generalServerItem>) {
    const idList: Array<string> = [];
    for (const item of data) {
      idList.push(item._id);
    }

    return onChange(name, idList);
  }

  function onChangeTimePicker(
    name: string,
    phase: "minute" | "hour",
    time: string
  ) {
    if (typeof value === "object") {
      const data = { ...value, [phase]: time };
      return onChange(name, data);
    }
    const data: TimePickerValue = { [phase]: time } as TimePickerValue;

    onChange(name, { ...data });
  }
  function onChangeDatePicker(name: string, date: Date) {
    onChange(name, date);
  }

  function formatValue(value) {
    if (typeof value === "string") {
      return value.toString();
    } else if (Array.isArray(value)) {
      return value;
    }
    if (value instanceof File) {
      return value;
    }
    if (typeof value === "object") {
      return value;
    }
    if (value instanceof Date) {
      return value;
    }
    return value;
  }

  const shouldShowError = showError(name);

  const currentValue = useMemo(() => formatValue(value), [value]);

  const sharedInputProps = {
    placeholder: label,
    showError: shouldShowError,
    errorMessage: errorMessage,
    value: currentValue,
    name: name,
    disabled: isDisabled,
    ariaLabel,
    required,
  };

  let component;
  switch (inputType) {
    case FORM_INPUTS_TYPES.INPUT:
      component = (
        <TextInput onChange={onChangeInput} {...sharedInputProps} type={type} />
      );
      break;
    case FORM_INPUTS_TYPES.AUTO_COMPLETE:
      component = (
        <AutoComplete
          options={options}
          onChange={onChangeAutoComplete}
          {...sharedInputProps}
          field={field}
        />
      );
      break;

    case FORM_INPUTS_TYPES.MULTI_SELECT_AUTO_COMPLETE:
      component = (
        <MultiSelectAutoComplete
          options={options}
          onChange={onChangeMultiSelect}
          {...sharedInputProps}
          field={field}
        />
      );
      break;

    case FORM_INPUTS_TYPES.RADIO:
      component = (
        <RadioButtons
          {...sharedInputProps}
          onChange={onChangeRadio}
          options={options}
          field={field}
        />
      );
      break;

    case FORM_INPUTS_TYPES.SELECT:
      component = (
        <Select
          {...sharedInputProps}
          onChange={onChangeAutoComplete}
          options={options}
          field={field}
        />
      );
      break;

    case FORM_INPUTS_TYPES.ANIMATED_INPUT:
      component = (
        <AnimatedInput
          {...sharedInputProps}
          onChange={onChangeInput}
          type={type}
        />
      );
      break;

    case FORM_INPUTS_TYPES.TEXT_AREA:
      component = (
        <BasicTextArea
          {...sharedInputProps}
          onChange={onChangeInput}
          rows={rows}
        />
      );
      break;

    case FORM_INPUTS_TYPES.ANIMATED_TEXT_AREA:
      component = (
        <AnimateTextArea
          {...sharedInputProps}
          onChange={onChangeInput}
          rows={rows}
        />
      );
      break;

    case FORM_INPUTS_TYPES.AUTO_GROW_TEXT_AREA:
      component = (
        <AutoGrowTextArea {...sharedInputProps} onChange={onChangeInput} />
      );
      break;

    case FORM_INPUTS_TYPES.ANIMATED_AUTO_GROW_TEXT_AREA:
      component = (
        <AnimatedAutoGrowTextArea
          {...sharedInputProps}
          onChange={onChangeInput}
        />
      );
      break;

    case FORM_INPUTS_TYPES.FILE_UPLOAD:
      component = (
        <UploadFileButton
          {...sharedInputProps}
          onChange={onFileChange}
          accept={accept}
        />
      );
      break;

    case FORM_INPUTS_TYPES.CHECKBOX:
      component = (
        <ChexkBoxs
          {...sharedInputProps}
          onChange={onChangeCheckbox}
          options={options}
          field={field}
        />
      );
      break;

    case FORM_INPUTS_TYPES.BITWISE_CHECKBOX:
      component = (
        <BitwiseCheckbox
          {...sharedInputProps}
          onChange={onChangeOptionsBitwise}
          options={options}
          field={field}
          bitwiseValueField={bitwiseField}
        />
      );
      break;
    case FORM_INPUTS_TYPES.TIME_PICKER:
      const hour = currentValue?.hour;
      const minute = currentValue?.minute;
      component = (
        <TimePicker
          {...sharedInputProps}
          onPicked={onChangeTimePicker}
          selectedHour={hour}
          selectedMinute={minute}
          endHour={endHour}
          startHour={startHour}
          minuteInterval={minuteInterval}
        />
      );
      break;
    case FORM_INPUTS_TYPES.DATE_PICKER:
      component = (
        <CustomDatePicker
          {...sharedInputProps}
          onChange={onChangeDatePicker}
          endYear={endYear}
          startYear={startYear}
          minDate={minDate}
        />
      );
      break;

    case FORM_INPUTS_TYPES.BORDER_INPUT:
      component = (
        <BorderInput
          {...sharedInputProps}
          onChange={onChangeInput}
          type={type}
          title={title}
        />
      );
      break;

    default:
      component = null;
      break;
  }

  const showTable = !!(
    showDataTable &&
    Array.isArray(optionsItems) &&
    Object.keys(optionsItems).length
  );

  return (
    <div className={styles["input-content"]}>
      {component && component}

      {showTable && (
        <TableCreator
          header={tableHeader}
          data={optionsItems}
          onChangeItems={onChangeItemsPostion}
          enableDrag={enableDrag}
        />
      )}
    </div>
  );
}

export default InputsCreator;
