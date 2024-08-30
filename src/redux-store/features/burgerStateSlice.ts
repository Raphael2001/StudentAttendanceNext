import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const burgerSlice = createSlice({
  name: "burgerState",
  initialState: false,
  reducers: {
    setBurger: (state, action: PayloadAction<boolean>) => action.payload,
  },
});

export const { setBurger } = burgerSlice.actions;

export default burgerSlice.reducer;
