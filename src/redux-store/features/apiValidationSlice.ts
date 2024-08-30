import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ValidationResponseType } from "utils/types/vaildation";

const apiValidationState: ValidationResponseType = {
  creditName: "",
  creditUrl: "",
  project: {
    _id: "",
    apiVersion: "",
    cdn: "",
    name: "",
    platform: "",
    url: "",
  },
};

export const apiValidationSlice = createSlice({
  name: "apiValidation",
  initialState: apiValidationState,
  reducers: {
    setApiValidationAction: (
      state: ValidationResponseType,
      action: PayloadAction<ValidationResponseType>
    ) => {
      return action.payload;
    },
  },
});

export const { setApiValidationAction } = apiValidationSlice.actions;

export default apiValidationSlice.reducer;
