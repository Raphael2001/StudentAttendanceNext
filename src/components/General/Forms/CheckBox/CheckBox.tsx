"use client";

import React, { ChangeEventHandler } from "react";

import styles from "./CheckBox.module.scss";

import { clsx } from "utils/functions";
import CheckboxImage from "components/General/Forms/CheckBox/CheckboxImage/CheckboxImage";
import { InputRef } from "utils/types/form";

type Props = {
	id: string;
	name: string;
	label?: string;
	value: boolean;
	onChange: ChangeEventHandler;
	className?: string;
	disabled?: boolean;
	ref?: InputRef;
};

function CheckBox(props: Props) {
	const { className = "", id, name, label = "", value = false, onChange, disabled = false, ref } = props;

	return (
		<div className={clsx(styles["checkbox-wrapper"], value ? styles["selected"] : "", className, disabled ? styles["disabled"] : "")}>
			<input
				type={"checkbox"}
				name={name}
				id={id}
				checked={value}
				onChange={onChange}
				ref={ref}
			/>
			<label htmlFor={id}>
				<CheckboxImage
					isSelected={value}
					className={styles["image-wrapper"]}
				/>

				{label && <span className={styles["label"]}>{label}</span>}
			</label>
		</div>
	);
}

export default CheckBox;
