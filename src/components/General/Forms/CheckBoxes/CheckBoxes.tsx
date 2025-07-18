"use client";

import React, { ChangeEventHandler } from "react";

import styles from "./CheckBoxes.module.scss";
import CheckBox from "components/General/Forms/CheckBox/CheckBox";
import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";

type checkboxOption = {
	_id: string;
};

type Props = {
	options: Array<checkboxOption>;
	disabled?: boolean;
	value: string;
	onChange: ChangeEventHandler;
	showError?: boolean;
	errorMessage?: string;
	placeholder?: string;
	field?: string;
	name: string;
};

function CheckBoxes(props: Props) {
	const { options = [], name, onChange, value, showError = false, errorMessage = "", placeholder, disabled = false, field = "text" } = props;

	return (
		<div className={styles["checkboxes-wrapper"]}>
			{placeholder && <span className={styles["title"]}>{placeholder}</span>}
			<div className={styles["inputs"]}>
				{options.map((option) => {
					return (
						<CheckBox
							key={"option" + option._id}
							id={option._id}
							name={name}
							label={option[field]}
							onChange={onChange}
							disabled={disabled}
							value={value.includes(option._id)}
						/>
					);
				})}
			</div>
			<BasicInputErrorMsg
				showError={showError}
				errorMessage={errorMessage}
			/>
		</div>
	);
}

export default CheckBoxes;
