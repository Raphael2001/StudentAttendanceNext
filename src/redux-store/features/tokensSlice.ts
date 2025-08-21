import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
};

export const tokensSlice = createSlice({
  name: "tokens",
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      return { ...state, accessToken: action.payload };
    },
    setRefreshToken: (state, action) => {
      return { ...state, refreshToken: action.payload };
    },
    resetTokens: () => initialState,
  },
});

export const { resetTokens, setAccessToken, setRefreshToken } =
  tokensSlice.actions;

export default tokensSlice.reducer;
