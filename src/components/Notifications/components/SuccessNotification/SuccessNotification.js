import React from "react";
import { Notification } from "components/Notifications/notifications";

import Icon from "/public/assets/icons/notifications/check.svg";

export default function SuccessNotification(props) {
  const { payload } = props;
  return <Notification {...payload} icon={Icon.src} color={"green"} />;
}
