import { useCallback } from "react";
import { AnySchema, ValidationErrorItem } from "joi";
import useErrorsTranslate from "./useErrorsTranslate";

type FieldSchemas = Record<string, AnySchema>;

type ValidationResult = {
  valid: boolean;
  msg: string;
};

export const useFieldValidator = () => {
  const translate = useErrorsTranslate();

  return useCallback(
    (schema: AnySchema, value: any, name: string): ValidationResult => {
      const { error } = schema.validate(value);
      if (!error) return { valid: true, msg: "" };

      const detail: ValidationErrorItem = error.details[0];
      let type = detail.type;
      const context = detail.context || {};

      if (type === "string.pattern.base") {
        type += "." + name;
      }

      let translated = translate(type);

      for (const [key, val] of Object.entries(context)) {
        translated = translated.replace(`{${key}}`, String(val));
      }

      return {
        valid: false,
        msg: translated || detail.message,
      };
    },
    [translate],
  );
};
