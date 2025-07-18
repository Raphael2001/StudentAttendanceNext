import React from "react";

import styles from "./ActionButtonIconText.module.scss";
import Icon from "components/General/Icon/Icon";
import { IconType } from "utils/types/svg";

type Props = {
	text: string;
	icon?: IconType;
	onClick: () => void;
	color: string;
};
function ActionButtonIconText({ text, icon, onClick, color }: Props) {
	return (
		<button
			className={`${styles["action-button-text"]} tag ${color}`}
			onClick={onClick}
		>
			<Icon
				src={icon}
				className={styles["action-button-icon"]}
			/>
			{text}
		</button>
	);
}

export default ActionButtonIconText;
