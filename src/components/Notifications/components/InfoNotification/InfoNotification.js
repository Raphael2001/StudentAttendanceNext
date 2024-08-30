import React from "react";
import { Notification } from "components/Notifications/notifications";

import Icon from "/public/assets/icons/notifications/info.svg";

export default function InfoNotification(props) {
  const { payload } = props;
  return <Notification {...payload} icon={Icon.src} color="blue" />;
}
