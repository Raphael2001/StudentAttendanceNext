import {
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from "constants/ButtonTypes";

export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];

export type ButtonVariant =
  (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

export type ButtonShape = (typeof BUTTON_SHAPE)[keyof typeof BUTTON_SHAPE];

export type ButtonColor =
  | "default"
  | "success"
  | "info"
  | "warning"
  | "help"
  | "danger";
