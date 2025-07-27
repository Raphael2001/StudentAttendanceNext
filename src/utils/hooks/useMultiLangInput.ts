import { useMemo } from "react";
import { useAppSelector } from "./useRedux";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import { AnySchema } from "joi";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

function useMultiLangInput() {
  const languages = useAppSelector((store) => store.init?.languages);

  function getLangInputs(
    name: string = "",
    label: string = "",
    schema: AnySchema = VALIDATION_SCHEMES.String,
    inputType: string = FORM_INPUTS_TYPES.INPUT,
  ) {
    return languages.map((languageData) => {
      const n = name ? `${name}.${languageData.langId}` : languageData.langId;
      const l = label ? `${label} - ${languageData.lang}` : languageData.lang;

      return {
        name: n,
        inputType,
        label: l,
        schema,
      };
    });
  }

  return useMemo(() => getLangInputs, [languages]);
}

export default useMultiLangInput;
