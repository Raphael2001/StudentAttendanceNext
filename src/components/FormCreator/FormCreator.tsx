"use client";

import React, { ComponentType, forwardRef, useEffect, useState } from "react";

import styles from "./FormCreator.module.scss";
import InputsCreator from "./InputsCreator/InputsCreator";
import CmsButton from "components/CmsButton/CmsButton";
import { FormDataType, FormInputData, onChangeValue } from "utils/types/form";
import { copy } from "utils/functions";
import useValidate from "utils/hooks/useValidate";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";

type Props = {
  formData: FormDataType;
  children?: React.ReactNode;
  CustomButton?: ComponentType<any>;
  onSubmit: (payload: Object) => void;
  buttonText: string;
};

const FormCreator = forwardRef((props: Props, ref) => {
  const { formData, children, CustomButton, buttonText, onSubmit } = props;
  const { inputs, initialData } = formData;

  const [firstTry, setFirstTry] = useState(true);

  const [form, setForm] = useState({});
  const validate = useValidate();

  function defaultValue(input: FormInputData) {
    switch (input.inputType) {
      case FORM_INPUTS_TYPES.MULTI_SELECT_AUTO_COMPLETE:
        return [];
      default:
        return "";
    }
  }

  useEffect(() => {
    const formData = {};
    if (Array.isArray(inputs)) {
      for (const key in inputs) {
        const input = inputs[key];
        let initialValue = defaultValue(input);
        if (initialData && initialData[input.name]) {
          initialValue = initialData[input.name];
        }

        formData[input.name] = {
          value: initialValue,
          valid: false,
          errorMessage: "",
          rules: input.rules,
        };
      }
    }
    setForm(formData);
  }, [initialData, inputs]);

  function onChange(name: string, value: onChangeValue) {
    const newState = copy(form);

    const { valid, msg } = validate(value, form[name].rules);

    newState[name].value = value;
    newState[name].valid = valid;
    newState[name].errorMessage = msg;

    setForm(newState);
  }

  function showError(name: string) {
    return !form?.[name]?.valid && !firstTry;
  }

  function onSubmitHandler() {
    setFirstTry(false);

    let formValid = true;
    const payload = {};
    const newState = copy(form);

    for (const key in form) {
      const validationObj = validate(form[key].value, form[key].rules);
      newState[key].valid = validationObj.valid;
      newState[key].errorMessage = validationObj.msg;

      payload[key] = form[key].value;

      if (!validationObj.valid) {
        formValid = false;
      }
    }

    setForm(newState);

    if (formValid) {
      onSubmit(payload);
    }
  }

  return (
    <div className={styles["cms-form"]}>
      {inputs.map((input) => {
        if (form[input.name]) {
          return (
            <InputsCreator
              input={input}
              key={"input" + input.name}
              onChange={onChange}
              showError={showError}
              value={form?.[input.name]?.value}
              errorMessage={form?.[input.name]?.errorMessage}
            />
          );
        }
        return null;
      })}
      {children && children}
      <div className={styles["actions"]}>
        {CustomButton ? (
          <CustomButton text={buttonText} onClick={onSubmitHandler} />
        ) : (
          <CmsButton text={buttonText} onClick={onSubmitHandler} />
        )}
      </div>
    </div>
  );
});
FormCreator.displayName = "FormCreator";

export default FormCreator;
