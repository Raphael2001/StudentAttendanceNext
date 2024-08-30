"use client";

import NotificationsTypes from "constants/NotificationsTypes";
import { addNotification } from "redux-store/features/notificationsSlice";
import { useAppDispatch } from "./useRedux";

function useNotificationsHandler() {
  const dispatch = useAppDispatch();

  function onSuccessNotification() {
    dispatch(
      addNotification({
        type: NotificationsTypes.SUCCCESS,
        payload: { title: "עודכן בהצלחה", text: "המידע עודכן בהצלחה" },
      })
    );
  }
  return { onSuccessNotification };
}

export default useNotificationsHandler;
