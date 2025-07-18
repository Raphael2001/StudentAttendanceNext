import React from "react";

import { Notification } from "components/General/Notifications/notifications";
import { NotificationPayload } from "utils/types/notification";
import Error from "components/General/Svg/Error";

type Props = {
	payload: NotificationPayload;
};

export default function ErrorNotification(props: Props) {
	const { payload } = props;
	return (
		<Notification
			notification={payload}
			icon={Error}
			color="red"
		/>
	);
}
