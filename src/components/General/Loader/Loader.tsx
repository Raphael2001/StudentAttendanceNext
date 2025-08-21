import React from "react";

import styles from "./Loader.module.scss";
import { clsx } from "utils/functions";

type Props = {
	show?: boolean;
};

export default function Loader({ show = true }: Props) {
	return (
		<div className={clsx(styles["loader-wrapper"], show ? "" : styles["hidden"])}>
			<div className={styles["loader"]}></div>
		</div>
	);
}
