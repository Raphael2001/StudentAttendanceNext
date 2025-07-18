import React from "react";
import { Notification } from "components/General/Notifications/notifications";

import { NotificationPayload } from "utils/types/notification";
import Info from "components/General/Svg/Info";

type Props = {
	payload: NotificationPayload;
};

export default function InfoNotification(props: Props) {
	const { payload } = props;
	return (
		<Notification
			notification={payload}
			icon={Info}
			color="blue"
		/>
	);
}
