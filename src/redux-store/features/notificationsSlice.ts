import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { copy } from "utils/functions";
import { Notification } from "utils/types/notification";

type NotificationsState = Notification[];
const initialState: NotificationsState = [];
export const notificationsSlice = createSlice({
  name: "notificationsArray",
  initialState: initialState,
  reducers: {
    addNotification: (
      state: NotificationsState,
      action: PayloadAction<Notification>,
    ) => {
      const id: string = crypto.randomUUID();
      state.push({
        type: action.payload.type,
        payload: { ...action.payload.payload, id },
      });
    },
    removeNotification: (
      state: NotificationsState,
      action: PayloadAction<string>,
    ) => {
      const notificationsArray: Array<Notification> = copy(state);
      return notificationsArray.filter(
        (item) => item.payload.id !== action.payload,
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
