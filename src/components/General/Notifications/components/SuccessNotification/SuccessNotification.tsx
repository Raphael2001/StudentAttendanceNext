import React from "react";
import { Notification } from "components/General/Notifications/notifications";

import { NotificationPayload } from "utils/types/notification";
import CheckMark from "components/General/Svg/CheckMark";

type Props = {
	payload: NotificationPayload;
};
export default function SuccessNotification(props: Props) {
	const { payload } = props;
	return (
		<Notification
			notification={payload}
			icon={CheckMark}
			color={"green"}
		/>
	);
}
