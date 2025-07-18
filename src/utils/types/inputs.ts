import { KeyboardEvent } from "react";

export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;

export type OnChangeCheckboxValue = {
  id: string;
  values: Array<string>;
  name: string;
};

export type GeneralOptionItem = {
  _id: string;
};

export type OnKeyDownButton = KeyboardEvent<HTMLButtonElement>;
export type OnKeyDownInput = KeyboardEvent<HTMLInputElement>;

export type OptionColor = {
  color: string;
  _id: string;
  text: string;
};
