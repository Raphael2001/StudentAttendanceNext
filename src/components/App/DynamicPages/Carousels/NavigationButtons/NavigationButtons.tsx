import React from "react";

import styles from "./NavigationButtons.module.scss";
import { clsx } from "utils/functions";
import Chevron from "components/General/Svg/Chevron";

type Props = {
	nextClassName?: string;
	prevClassName?: string;
};

export default function NavigationButtons(props: Props) {
	const { nextClassName, prevClassName } = props;

	return (
		<div className={styles["navigation-wrapper"]}>
			<button className={clsx(styles["navigation"], styles["prev"], prevClassName)}>
				<Chevron />
			</button>
			<button className={clsx(styles["navigation"], styles["next"], nextClassName)}>
				<Chevron />
			</button>
		</div>
	);
}
