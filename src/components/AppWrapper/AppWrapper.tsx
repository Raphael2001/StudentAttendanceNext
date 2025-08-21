import { StoreProvider } from "app/StoreProvider";
import Notifications from "components/General/Notifications/notifications";
import ScreenLoader from "components/General/ScreenLoader/ScreenLoader";
import dynamic from "next/dynamic";

const Popups = dynamic(() => import("popups/popup"));

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
    <div className={clsx(color, className)}>
      <StoreProvider data={data} apiValidationData={apiValidationData}>
        {children}

        <Notifications />
        <Popups className={color} />

        <ScreenLoader />
      </StoreProvider>
    </div>
  );
}

export default AppWrapper;
