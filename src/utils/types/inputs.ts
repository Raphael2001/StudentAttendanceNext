import { KeyboardEvent } from "react";

export type inputEvent = React.ChangeEvent<HTMLInputElement>;
export type textAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;

export type onChangeCheckboxValue = {
  id: string;
  values: Array<string>;
  name: string;
};

export type GeneralOptionItem = {
  _id: string;
};

export type onKeyDownButton = KeyboardEvent<HTMLButtonElement>;
export type onKeyDownInput = KeyboardEvent<HTMLInputElement>;

export type optionColorType = {
  color: string;
  _id: string;
  text: string;
};
