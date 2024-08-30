import { createSlice } from "@reduxjs/toolkit";
import { InitApp } from "utils/types/initApp";

const initialState: InitApp = {
  texts: {},
  menus: [],
  ingredientsMenus: {},
};

export const initAppSlice = createSlice({
  name: "initApp",
  initialState,
  reducers: {
    setInitApp: (state, action) => action.payload,
  },
});

export const { setInitApp } = initAppSlice.actions;

export default initAppSlice.reducer;
