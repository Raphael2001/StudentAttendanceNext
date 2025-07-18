"use client";
import React, { useEffect, useState } from "react";

import ErrorNotification from "components/General/Notifications/components/ErrorNotification/ErrorNotification";
import WarnNotification from "components/General/Notifications/components/WarnNotification/WarnNotification";
import SuccessNotification from "components/General/Notifications/components/SuccessNotification/SuccessNotification";
import InfoNotification from "components/General/Notifications/components/InfoNotification/InfoNotification";

import NotificationsTypes from "constants/NotificationsTypes";

import styles from "./notifications.module.scss";
import { clsx } from "utils/functions";
import { removeNotification } from "redux-store/features/notificationsSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks/useRedux";
import { NotificationPayload } from "utils/types/notification";
import { IconType } from "utils/types/svg";
import Icon from "components/General/Icon/Icon";
import CloseIcon from "components/General/Svg/CloseIcon";

function Notifications() {
	const notificationsArray = useAppSelector((store) => store.notificationsArray);

	function getNotificationByType(notification) {
		const { type, payload } = notification;
		const { id } = payload;

		const notificationComponents = {
			[NotificationsTypes.ERROR]: (
				<ErrorNotification
					key={id}
					payload={payload}
				/>
			),
			[NotificationsTypes.WARN]: (
				<WarnNotification
					key={id}
					payload={payload}
				/>
			),
			[NotificationsTypes.SUCCESS]: (
				<SuccessNotification
					key={id}
					payload={payload}
				/>
			),
			[NotificationsTypes.INFO]: (
				<InfoNotification
					key={id}
					payload={payload}
				/>
			),
		};
		return type in notificationComponents ? (
			notificationComponents[type]
		) : (
			<InfoNotification
				key={id}
				payload={payload}
			/>
		);
	}

	const renderNotifications = () => {
		return [...notificationsArray].reverse().map((notificationData) => getNotificationByType(notificationData));
	};

	return <div className={styles["notifications-container"]}>{renderNotifications()}</div>;
}

export default Notifications;

type Props = {
	className?: string;
	color?: string;
	notification: NotificationPayload;
	icon?: IconType;
};

export function Notification(props: Props) {
	const { icon, className = "", color = "green", notification } = props;

	const { id = "", title, text, timer = 2000 } = notification;

	const [animationClass, setAnimationClass] = useState("");
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
			setAnimationClass("done");
		}

		if (animationClass === "exit") {
			dispatch(removeNotification(id));
		}
	}

	function animateIn() {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setAnimationClass("active");
			});
		});
	}

	function animateOut() {
		setAnimationClass("exit");
	}

	return (
		<div
			className={clsx(styles["notification-wrapper"], styles[animationClass], className)}
			onTransitionEnd={completeAnimation}
		>
			<div className={clsx(styles["container"], "tag", color)}>
				<div
					className={clsx(styles["close-icon-wrapper"])}
					onClick={animateOut}
				>
					<CloseIcon className={clsx(styles["close-icon"], "tag-icon", color)} />
				</div>

				{icon && (
					<div className={clsx(styles["icon-wrapper"])}>
						<Icon
							src={icon}
							className={clsx(styles["icon"], "tag-icon", color)}
						/>
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
