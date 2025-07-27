import React from "react";

import styles from "./ActionButtonIcon.module.scss";
import { IconType } from "utils/types/svg";
import Icon from "components/General/Icon/Icon";
import { clsx } from "utils/functions";

type Props = {
	icon: IconType;
	onClick: () => void;
	color: string;
};

function ActionButtonIcon({ icon, onClick, color }: Props) {
	return (
		<button
			className={clsx(styles["action-button-icon"])}
			onClick={onClick}
		>
			<Icon
				src={icon}
				className={clsx("tag-icon", color)}
			/>
		</button>
	);
}

export default ActionButtonIcon;
