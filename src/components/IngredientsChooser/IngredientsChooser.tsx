"use client";

import React, { ChangeEventHandler, useEffect, useMemo, useState } from "react";

import styles from "./IngredientsChooser.module.scss";
import { useAppSelector } from "utils/hooks/useRedux";

import { inputEvent } from "utils/types/inputs";
import { copy } from "utils/functions";
import { CheckboxOptions, RadioOptions } from "./Options/Options";
import { onChangeValue } from "utils/types/form";
import useValidate from "utils/hooks/useValidate";
import AnimatedAutoGrowTextArea from "components/forms/AnimatedAutoGrowTextArea/AnimatedAutoGrowTextArea";

import Api from "api/requests";
import AddToCartButtons from "components/AddToCartButtons/AddToCartButtons";
type Props = {
  ingredientsMenus: Array<string>;
  itemId: string;
};
type FormData = {
  [key: string]: FormIngredientInput;
};

type FormIngredientInput = {
  value: string | Array<string>;
  errorMessage: string;
  isValid: boolean;
  rules: Array<any>;
};

export default function IngredientsForm(props: Props) {
  const { ingredientsMenus, itemId } = props;

  const menus = useAppSelector((store) => store.initApp.ingredientsMenus);

  const [form, setForm] = useState<FormData>();
  const [isFirstTry, setIsFirstTry] = useState<boolean>(true);
  const validate = useValidate();

  useEffect(() => {
    const inputs = {};
    for (const menuId of ingredientsMenus) {
      const menu = menus[menuId];
      const isRadio = menu.isRadio;
      const value = menu.isRadio ? "" : [];

      const rules = isRadio
        ? ["not_empty"]
        : [["arrayMinOptions", menu.minOptions]];

      const input: FormIngredientInput = {
        value,
        isValid: false,
        errorMessage: "",
        rules,
      };
      inputs[menuId] = input;
    }

    const notesInputs: FormIngredientInput = {
      value: "",
      isValid: false,
      errorMessage: "",
      rules: ["no_validation"],
    };
    inputs["notes"] = notesInputs;

    setForm(inputs);
  }, [ingredientsMenus, menus]);

  function onRadioChange(e: inputEvent) {
    const { id, name } = e.target;

    const value = id.split("-")[1];

    onChange(name, value);
  }

  function onCheckBoxChange(e: inputEvent) {
    const { id, name } = e.target;

    const value = form?.[name].value;

    const idValue = id.split("-")[1];

    if (Array.isArray(value)) {
      let newData = [...value];
      if (Array.isArray(value) && value.includes(idValue)) {
        // remove from array
        newData = newData.filter((t) => t !== idValue);
      } else {
        newData.push(idValue);
      }

      onChange(name, newData);
    }
  }

  function onChangeInput(e: inputEvent) {
    const { name, value } = e.target;
    onChange(name, value);
  }

  function onChange(name: string, value: onChangeValue) {
    if (form) {
      const newState = copy(form);

      const { valid, msg } = validate(value, form[name].rules);

      newState[name].value = value;
      newState[name].valid = valid;
      newState[name].errorMessage = msg;

      setForm(newState);
    }
  }

  function onSubmit(quantity) {
    setIsFirstTry(false);

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
      addToCart(payload, quantity);
    }
  }

  function addToCart(formPayload, quantity: number) {
    const notes = formPayload.notes;
    delete formPayload.notes;
    const payload = {
      item: { [itemId]: formPayload },
      notes,
      quantity,
    };

    console.log("payload", JSON.stringify(payload));
  }

  return (
    <div className={styles["form"]}>
      <div className={styles["options"]}>
        {ingredientsMenus.map((menuId, index) => {
          return (
            <IngredientsChooser
              key={menuId + index}
              menuId={menuId}
              onRadioChange={onRadioChange}
              onCheckBoxChange={onCheckBoxChange}
              inputData={form?.[menuId]}
              isFirstTry={isFirstTry}
            />
          );
        })}
      </div>

      <AnimatedAutoGrowTextArea
        className="notes-input"
        onChange={onChangeInput}
        name="notes"
        placeholder="הערות למנה"
        ariaLabel="הערות למנה"
        required={false}
        value={form?.notes.value.toString() ?? ""}
      />

      <AddToCartButtons onSubmit={onSubmit} />
    </div>
  );
}

type IngredientsChooserProps = {
  menuId: string;
  onRadioChange: ChangeEventHandler;
  onCheckBoxChange: ChangeEventHandler;
  inputData?: FormIngredientInput;
  isFirstTry: boolean;
};

function IngredientsChooser(props: IngredientsChooserProps) {
  const { menuId, onRadioChange, inputData, onCheckBoxChange, isFirstTry } =
    props;
  const ingredientsMenus = useAppSelector(
    (store) => store.initApp.ingredientsMenus
  );
  const menu = ingredientsMenus[menuId];
  const value = inputData?.value;

  const showError = useMemo(
    () => !inputData?.isValid && !isFirstTry,
    [inputData, isFirstTry]
  );
  const errorMessage = inputData?.errorMessage;

  if (!menu) {
    return null;
  }

  return (
    <div className={styles["ingredients-chooser"]}>
      {Array.isArray(value) ? (
        <RenderCheckbox
          onChange={onCheckBoxChange}
          menuId={menuId}
          value={value}
          errorMessage={errorMessage}
          showError={showError}
        />
      ) : (
        <RenderRadio
          onChange={onRadioChange}
          menuId={menuId}
          value={value}
          errorMessage={errorMessage}
          showError={showError}
        />
      )}
    </div>
  );
}

type RadioProps = {
  onChange: ChangeEventHandler;
  menuId: string;
  value?: string;
  errorMessage?: string;
  showError: boolean;
};

function RenderRadio(props: RadioProps) {
  const { onChange, menuId, value = "", showError, errorMessage } = props;
  const ingredientsMenus = useAppSelector(
    (store) => store.initApp.ingredientsMenus
  );
  const menu = ingredientsMenus[menuId];

  return (
    <RadioOptions
      name={menuId}
      options={menu.ingredients}
      onChange={onChange}
      value={value}
      title={menu.title}
      subtitle={menu.subtitle}
      isFree={menu.isFree}
      showError={showError}
      errorMessage={errorMessage}
    />
  );
}

type CheckbxoProps = {
  onChange: ChangeEventHandler;
  menuId: string;
  value: Array<string>;
  errorMessage?: string;
  showError: boolean;
};
function RenderCheckbox(props: CheckbxoProps) {
  const { onChange, menuId, value = [], showError, errorMessage } = props;
  const ingredientsMenus = useAppSelector(
    (store) => store.initApp.ingredientsMenus
  );
  const menu = ingredientsMenus[menuId];

  return (
    <CheckboxOptions
      name={menuId}
      options={menu.ingredients}
      onChange={onChange}
      value={value}
      title={menu.title}
      subtitle={menu.subtitle}
      isFree={menu.isFree}
      maxOptions={menu.maxOptions}
      showError={showError}
      errorMessage={errorMessage}
    />
  );
}
