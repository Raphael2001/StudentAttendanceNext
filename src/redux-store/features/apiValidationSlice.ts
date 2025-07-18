import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ValidationApiResponse } from "utils/types/apiResponse";

const apiValidationState: ValidationApiResponse = {
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
      state: ValidationApiResponse,
      action: PayloadAction<ValidationApiResponse>,
    ) => {
      return action.payload;
    },
  },
});

export const { setApiValidationAction } = apiValidationSlice.actions;

export default apiValidationSlice.reducer;
