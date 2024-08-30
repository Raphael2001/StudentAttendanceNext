import React from "react";

import Icon from "/public/assets/icons/notifications/error.svg";
import { Notification } from "components/Notifications/notifications";

export default function ErrorNotification(props) {
  const { payload } = props;
  return <Notification {...payload} icon={Icon.src} color="red" />;
}
