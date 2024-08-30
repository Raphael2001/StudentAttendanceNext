import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
  isTablet: false,
  isLaptop: false,
  isDesktopLarge: false,
  isDesktopMax: false,
  isDesktop: false,
  notDesktop: false,
  notMobile: false,
};

export const deviceSlice = createSlice({
  name: "deviceState",
  initialState,
  reducers: {
    setDeviceState: (state, action) => action.payload,
  },
});

export const { setDeviceState } = deviceSlice.actions;

export default deviceSlice.reducer;
