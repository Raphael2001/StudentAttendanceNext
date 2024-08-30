"use client";

import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "redux-store";
import { setApiValidationAction } from "redux-store/features/apiValidationSlice";
import { setInitApp } from "redux-store/features/initAppSlice";
import DeviceState from "utils/deviceState";
import { InitApp } from "utils/types/initApp";
import { ValidationResponseType } from "utils/types/vaildation";

interface Props {
  readonly children: ReactNode;
  data?: InitApp;
  apiValidationData?: ValidationResponseType;
}

export const StoreProvider = ({ children, data, apiValidationData }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    if (data) {
      storeRef.current.dispatch(setInitApp(data));
    }
    if (apiValidationData) {
      storeRef.current.dispatch(setApiValidationAction(apiValidationData));
    }
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    DeviceState.init();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
