import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Popup } from "utils/types/popup";

type PopupPayload = {
  type: string;
  payload?: any;
  priority?: number;
};

export const popupsSlice = createSlice({
  name: "popupsArray",
  initialState: [],
  reducers: {
    addPopup: (state: Popup[], action: PayloadAction<PopupPayload>) => {
      const { payload = {}, type, priority = 1 } = action.payload;

      const popup = {
        payload,
        type,
        priority,
      };
      state.push(popup);
      state.sort((a, b) => a.priority - b.priority);
    },
    removePopup: (state) => {
      state.pop();
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPopup, removePopup } = popupsSlice.actions;

export default popupsSlice.reducer;
