import React from "react";

import styles from "./CloseButton.module.scss";
import { clsx } from "utils/functions";

type Props = {
	onClick: (e?: React.MouseEvent) => void;
	className?: string;
};

export default function CloseButton(props: Props) {
	const { onClick, className } = props;

	return (
		<button
			className={clsx(styles["close-icon-wrapper"], className)}
			onClick={onClick}
		>
			<div className={styles["close-icon"]}>
				<img
					src="/assets/icons/close-icon.svg"
					alt="close"
				/>
			</div>
		</button>
	);
}
