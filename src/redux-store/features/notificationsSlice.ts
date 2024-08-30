import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { copy, generateUniqueId } from "utils/functions";
import { notification } from "utils/types/notification";

type NotificationsState = notification[];
const initialState: NotificationsState = [];
export const notificationsSlice = createSlice({
  name: "notificationsArray",
  initialState: initialState,
  reducers: {
    addNotification: (
      state: NotificationsState,
      action: PayloadAction<notification>
    ) => {
      const id: string = generateUniqueId(16);
      state.push({
        type: action.payload.type,
        payload: { ...action.payload.payload, id },
      });
    },
    removeNotification: (
      state: NotificationsState,
      action: PayloadAction<string>
    ) => {
      const notificationsArray: Array<notification> = copy(state);
      return notificationsArray.filter(
        (item) => item.payload.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
