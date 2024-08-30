import { StoreProvider } from "app/StoreProvider";
import Notifications from "components/Notifications/notifications";
import ScreenLoader from "components/ScreenLoader/ScreenLoader";
import Popups from "popups/popup";
import React from "react";
import { clsx } from "utils/functions";

function AppWrapper({
  children,
  color = "site",
  data = undefined,
  className = "",
  apiValidationData,
}) {
  return (
    <body className={clsx(color, className)}>
      <StoreProvider data={data} apiValidationData={apiValidationData}>
        {children}

        <Notifications />
        <Popups className={color} />

        <ScreenLoader />
      </StoreProvider>
    </body>
  );
}

export default AppWrapper;
