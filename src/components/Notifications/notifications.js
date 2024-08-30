"use client";
import React, { useEffect, useState } from "react";

import ErrorNotification from "./components/ErrorNotification/ErrorNotification";
import WarnNotification from "./components/WarnNotification/WarnNotification";
import SuccessNotification from "./components/SuccessNotification/SuccessNotification";
import InfoNotification from "./components/InfoNotification/InfoNotification";

import NotificationsTypes from "constants/NotificationsTypes";

import CloseIcon from "/public/assets/icons/close-icon.svg";
import styles from "./notifications.module.scss";
import { clsx } from "utils/functions";
import { removeNotification } from "redux-store/features/notificationsSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks/useRedux";

function Notifications(props) {
  const notificationsArray = useAppSelector(
    (store) => store.notificationsArray
  );

  function getNotificationByType(notification) {
    const { type, payload } = notification;
    const { id } = payload;

    const notificationComponents = {
      [NotificationsTypes.ERROR]: (
        <ErrorNotification key={id} payload={payload} />
      ),
      [NotificationsTypes.WARN]: (
        <WarnNotification key={id} payload={payload} />
      ),
      [NotificationsTypes.SUCCCESS]: (
        <SuccessNotification key={id} payload={payload} />
      ),
      [NotificationsTypes.INFO]: (
        <InfoNotification key={id} payload={payload} />
      ),
    };
    const notificatiosToReturn =
      type in notificationComponents ? (
        notificationComponents[type]
      ) : (
        <InfoNotification key={id} payload={payload} />
      );
    return notificatiosToReturn;
  }

  const renderNotifications = () => {
    return [...notificationsArray]
      .reverse()
      .map((notificationData) => getNotificationByType(notificationData));
  };

  return (
    <div className={styles["notifications-container"]}>
      {renderNotifications()}
    </div>
  );
}

export default Notifications;

export function Notification(props) {
  const {
    id,
    title,
    text,
    icon,
    timer = 2000,
    className = "",
    color = "green",
  } = props;

  const [animationClass, setAminationClass] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    animateIn();

    const timeout = setTimeout(() => {
      animateOut();
    }, timer);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function completeAnimation() {
    if (animationClass !== "exit" && animationClass !== "done") {
      setAminationClass("done");
    }

    if (animationClass === "exit") {
      dispatch(removeNotification(id));
    }
  }

  function animateIn() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAminationClass("active");
      });
    });
  }

  function animateOut() {
    setAminationClass("exit");
  }

  return (
    <div
      className={clsx(
        styles["notification-wrapper"],
        styles[animationClass],
        className
      )}
      onTransitionEnd={completeAnimation}
    >
      <div className={clsx(styles["continer"], "glass", color)}>
        <div
          className={clsx(styles["close-icon"], "icon", "white")}
          onClick={animateOut}
        >
          <img src={CloseIcon.src} alt={"close"} />
        </div>

        {icon && (
          <div className={clsx(styles["icon-wrapper"], "icon", color)}>
            <img src={icon} alt={"notification-icon"} />
          </div>
        )}
        <div className={styles["text-wrapper"]}>
          {title && <span className={styles["title"]}>{title}</span>}
          {text && <span className={styles["text"]}>{text}</span>}
        </div>
        <div className={styles["divider"]} />
      </div>
    </div>
  );
}
