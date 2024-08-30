"use client";

import React, { PropsWithChildren } from "react";

import styles from "./Skeleton.module.scss";
import { clsx } from "utils/functions";

type Props = {
  isLoaded?: boolean;
  className?: string;
};

const isClient = typeof window !== "undefined";

function Skeleton(props: PropsWithChildren<Props>) {
  const { children, isLoaded = false, className = "" } = props;

  return (
    <div
      className={clsx(
        styles["skeleton"],
        className,
        isClient ? (isLoaded ? styles["loaded"] : "") : styles["loaded"]
      )}
    >
      <div className={clsx(styles["content"])}>{children}</div>
    </div>
  );
}

export default Skeleton;
