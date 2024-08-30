import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permission: 0,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});
export const { updateUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
