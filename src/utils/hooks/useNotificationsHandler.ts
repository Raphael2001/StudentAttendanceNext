"use client";

import NotificationsTypes from "constants/NotificationsTypes";
import { addNotification } from "redux-store/features/notificationsSlice";
import { useAppDispatch } from "./useRedux";
import useCMSTranslate from "./useCMSTranslate";

function useNotificationsHandler() {
	const dispatch = useAppDispatch();

	const translate = useCMSTranslate();

	function onSuccessNotification() {
		dispatch(
			addNotification({
				type: NotificationsTypes.SUCCESS,
				payload: {
					title: translate("success_notification_title"),
					text: translate("success_notification_text"),
				},
			}),
		);
	}
	return { onSuccessNotification };
}

export default useNotificationsHandler;
