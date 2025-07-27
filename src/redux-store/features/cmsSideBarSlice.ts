import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const cmsSideBarSlice = createSlice({
  name: "cmsSideBar",
  initialState: {
    isOpen: true,
    showText: true,
  },
  reducers: {
    flipCmsSideBarOpen: (state) => ({
      ...state,
      isOpen: !state.isOpen,
    }),
    flipCmsSideBarTextVisible: (state) => ({
      ...state,
      showText: !state.showText,
    }),
  },
});

export const { flipCmsSideBarOpen, flipCmsSideBarTextVisible } =
  cmsSideBarSlice.actions;

export default cmsSideBarSlice.reducer;
