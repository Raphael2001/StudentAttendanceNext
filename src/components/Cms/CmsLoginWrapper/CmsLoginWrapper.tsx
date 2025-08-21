"use client";

import React, { useEffect, useState } from "react";

import { useAppDispatch } from "utils/hooks/useRedux";
import { setRefreshToken } from "redux-store/features/tokensSlice";
import Api from "api";
import LOCAL_STORAGE_KEYS from "constants/LocalStorage";
import LocalStorageService from "services/LocalStorageService";

function CmsLoginWrapper({ children, color }) {
  const [initialRequestsDone, setInitialRequestsDone] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = LocalStorageService.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    if (token) {
      dispatch(setRefreshToken(token));
      Api.auth.refreshToken.GET().then(() => {
        setInitialRequestsDone(true);
      });
    } else {
      setInitialRequestsDone(true);
    }
  }, []);

  return <div className={color}>{initialRequestsDone ? children : null}</div>;
}

export default CmsLoginWrapper;
