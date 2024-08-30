import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiCallData, updateStatusPayload } from "utils/types/api";

type ApiQueueState = ApiCallData[];
const apiQueueInitialState: ApiQueueState = [];

export const apiQueueSlice = createSlice({
  name: "apiQueue",
  initialState: apiQueueInitialState,
  reducers: {
    addCallToQueue: (
      state: ApiQueueState,
      action: PayloadAction<ApiCallData>
    ) => {
      return [...state, action.payload];
    },
    updateCallStatus: (
      state: ApiQueueState,
      action: PayloadAction<updateStatusPayload>
    ) => {
      const index = state.findIndex((call) => call._id === action.payload._id);
      if (index >= 0) {
        const callData = state[index];
        callData.status = action.payload.status;
        state[index] = callData;
      }
      return state;
    },
    removeCallFromQueue: (
      state: ApiQueueState,
      action: PayloadAction<string>
    ) => {
      return state.filter((call) => call._id !== action.payload);
    },
  },
});

export const { addCallToQueue, removeCallFromQueue, updateCallStatus } =
  apiQueueSlice.actions;

export default apiQueueSlice.reducer;
