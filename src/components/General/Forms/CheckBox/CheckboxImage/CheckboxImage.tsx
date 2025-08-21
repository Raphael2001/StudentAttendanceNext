"use client";

import React from "react";

import styles from "./CheckboxImage.module.scss";

import { clsx } from "utils/functions";
import CheckBox from "components/General/Svg/Checkbox/CheckBox";
import CheckMark from "components/General/Svg/Checkbox/CheckMark";

type Props = {
	isSelected: boolean;
	className?: string;
};

function CheckboxImage(props: Props) {
	const { isSelected, className = "" } = props;

	return (
		<div className={clsx(styles["checkbox-image-wrapper"], className)}>
			<CheckBox className={styles["checkbox-img"]} />

			<CheckMark className={clsx(styles["check-mark-img"], isSelected ? styles["selected"] : "")} />
		</div>
	);
}

export default CheckboxImage;
