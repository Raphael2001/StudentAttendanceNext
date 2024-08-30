import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loaderState",
  initialState: false,
  reducers: {
    setLoader: (state, action) => action.payload,
  },
});

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
