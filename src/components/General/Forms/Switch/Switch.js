import React from "react";

import styles from "./Switch.module.scss";
import { clsx } from "utils/functions";
function Switch(props) {
	const { state, onClick, name, className } = props;

	function onSwitchPress() {
		onClick(name, !state);
	}

	return (
		<div
			className={clsx(styles["switch-wrapper"], state ? styles["on"] : styles["off"], className)}
			onClick={onSwitchPress}
		>
			<div className={styles["indicator"]} />
		</div>
	);
}

export default Switch;
