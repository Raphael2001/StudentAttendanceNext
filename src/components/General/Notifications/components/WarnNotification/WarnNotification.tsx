import React from "react";
import { Notification } from "components/General/Notifications/notifications";

import { NotificationPayload } from "utils/types/notification";
import Warn from "components/General/Svg/Warn";

type Props = {
	payload: NotificationPayload;
};
export default function WarnNotification(props: Props) {
	const { payload } = props;
	return (
		<Notification
			notification={payload}
			icon={Warn}
			color="yellow"
		/>
	);
}
