"use client";

import { useCallback, useMemo } from "react";
import { useAppSelector } from "./useRedux";
import { FormPayloadType } from "utils/types/general";

function useMultiLangData(item?: Object) {
  const languages = useAppSelector((store) => store.init?.languages);

  function flattenObject(obj, prefix = "") {
    let result = {};

    for (let key in obj) {
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        // Recursively flatten the nested object
        let nested = flattenObject(obj[key], prefix + key + ".");
        result = { ...result, ...nested };
      } else {
        // Concatenate prefix and key for the new key
        result[prefix + key] = obj[key];
      }
    }

    return result;
  }

  const formatData = useCallback(
    (dataItem: any | undefined) => {
      if (dataItem && Object.keys(dataItem)) {
        return flattenObject(dataItem);
      }
      return undefined;
    },
    [languages]
  );

  function transformPayload(payload: FormPayloadType): FormPayloadType {
    const result: FormPayloadType = {};

    // Process each key in the payload
    Object.keys(payload).forEach((key) => {
      const parts = key.split(".");
      let current = result;

      // Create or traverse the nested structure
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {}; // Create a new object if the key doesn't exist
        }
        current = current[part]; // Move to the next level
      }

      // Assign the value to the last part of the split key
      current[parts[parts.length - 1]] = payload[key];
    });

    return result;
  }

  const initialData = useMemo(() => formatData(item), [item, formatData]);

  return { transformPayload, initialData };
}

export default useMultiLangData;
