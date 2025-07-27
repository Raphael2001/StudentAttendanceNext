"use client";
import React from "react";

import styles from "./CopyButton.module.scss";

import { useAppDispatch } from "utils/hooks/useRedux";
import { addNotification } from "redux-store/features/notificationsSlice";
import NotificationsTypes from "constants/NotificationsTypes";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

type Props = {
	value: string;
};

function CopyButton(props: Props) {
	const { value } = props;
	const dispatch = useAppDispatch();

	const translate = useCMSTranslate();

	function onCopyClick() {
		navigator.clipboard.writeText(value);
		dispatch(
			addNotification({
				type: NotificationsTypes.INFO,
				payload: {
					title: translate("copy_btn_notification_title"),
					text: translate("copy_btn_notification_text"),
				},
			}),
		);
	}

	return (
		<button
			className={styles["copy-btn"]}
			onClick={onCopyClick}
		>
			<img
				src={"/assets/icons/copy.svg"}
				alt={"copy"}
			/>
		</button>
	);
}

export default CopyButton;
