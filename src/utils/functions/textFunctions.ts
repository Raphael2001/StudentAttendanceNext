import { TextType } from "utils/types/initApp";

export function getText(data: string | TextType): string {
  if (typeof data === "string") {
    return data;
  }
  return data.text;
}

export function getTextType(value: TextType | string): TextType {
  if (typeof value === "string") {
    return { text: value, tag: "span" };
  }
  return value;
}
