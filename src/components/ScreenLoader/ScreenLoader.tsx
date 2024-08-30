"use client";

import React, { useEffect, useState } from "react";

import styles from "./ScreenLoader.module.scss";

import { useAppSelector } from "utils/hooks/useRedux";
const minimumLoaderTime = 700;

function ScreenLoader() {
  const loaderState = useAppSelector((store) => store.loaderState);
  const [showLoader, setShowLoader] = useState(false);
  const [minTimeReached, setMinTimeReached] = useState(false);

  useEffect(() => {
    if (loaderState) {
      setMinTimeReached(false);
      setShowLoader(true);

      const timeout = setTimeout(() => {
        setMinTimeReached(true);
        clearTimeout(timeout);
      }, minimumLoaderTime);
    }
    if (!loaderState && minTimeReached) {
      setShowLoader(false);
    }
  }, [loaderState, minTimeReached]);

  if (!showLoader) {
    return null;
  }

  return (
    <div className={styles["loader-wrapper"]}>
      <div className={styles["loader"]}></div>
    </div>
  );
}

export default ScreenLoader;
