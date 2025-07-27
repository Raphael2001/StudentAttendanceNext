import { HTMLInputTypeAttribute, RefObject } from "react";
import { GeneralServerItem } from "./general";
import { GeneralOptionItem } from "./inputs";
import { AnySchema } from "joi";

export type Inputs = Array<FormInputData | Array<FormInputData>>;
export interface FormData {
  inputs: Array<FormInputData | Array<FormInputData>>;
  initialData?: Object;
}

export interface FormInputData {
  name: string;
  label: string;
  inputType: string;
  options?: Array<any>;
  field?: string;
  isDisabled?: boolean;
  rows?: number;
  type?: HTMLInputTypeAttribute;
  accept?: string;
  required?: boolean;
  ariaLabel?: string;
  bitwiseField?: string;
  showDataTable?: boolean;
  tableHeaderData?: Array<FormTableHeaderItem>;
  enableDrag?: boolean;
  startHour?: number;
  endHour?: number;
  minuteInterval?: number;
  minDate?: Date;
  startYear?: number;
  endYear?: number;
  title?: string;
  id?: string;
  language?: string;
  showDeleteInputButton?: boolean;
  initialValue?: OnChangeValue;
  max?: number;
  schema: AnySchema;
}

export type FormTableHeaderItem = {
  name: string;
  title: string;
};

export type InputAccessibility = {
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
};

export type TextAreaRef = RefObject<HTMLTextAreaElement | null>;

export type InputRef = RefObject<HTMLInputElement | null>;
export type ButtonRef = RefObject<HTMLButtonElement | null>;

export type FormRef = TextAreaRef | InputRef | ButtonRef;

export type OnChangeValue =
  | string
  | Array<string | GeneralServerItem>
  | number
  | File
  | TimePickerValue
  | Date
  | Boolean;

export type TimePickerValue = {
  minute: number;
  hour: number;
};

export interface AutoCompleteDataProps {
  value: string;
  onChange: (name: string, option: GeneralOptionItem | null) => void;
  showError?: boolean;
  errorMessage?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  ref?: InputRef;
}

export interface AutoCompleteProps extends AutoCompleteDataProps {
  options: Array<GeneralOptionItem>;
  field?: string;
}

export interface MultiSelectAutoCompleteDataProps {
  value: Array<string>;
  onChange: (name: string, option: GeneralOptionItem) => void;
  showError?: boolean;
  errorMessage?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  ref?: InputRef;
}

export interface MultiSelectAutoCompleteProps
  extends MultiSelectAutoCompleteDataProps {
  options: Array<GeneralOptionItem>;
  field?: string;
}

export interface SelectDataProps {
  showError?: boolean;
  errorMessage?: string;
  id?: string;
  name?: string;
  onChange: (name: string, option: GeneralOptionItem) => void;
  value: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  ref?: ButtonRef;
}

export interface SelectProps extends SelectDataProps {
  options: Array<GeneralOptionItem>;
  field?: string;
}

export interface FormField {
  value: OnChangeValue;
  valid: boolean;
  errorMessage: string;
  schema: AnySchema;
  ref: FormRef;
}

export type Form = {
  [fieldName: string]: FormField;
};
