import React from "react";
import { Notification } from "components/Notifications/notifications";

import Icon from "/public/assets/icons/notifications/warn.svg";

export default function WarnNotification(props) {
  const { payload } = props;
  return <Notification {...payload} icon={Icon.src} color="orange" />;
}
