"use client";

import React, { ChangeEventHandler } from "react";

import styles from "./RadioButtons.module.scss";
import RadioButton from "components/General/Basic/RadioButton/RadioButton";
import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";

type radioOption = {
	_id: string;
};

type Props = {
	name: string;
	options: Array<radioOption>;
	disabled?: boolean;
	value: string;
	onChange: ChangeEventHandler;
	showError?: boolean;
	errorMessage?: string;
	placeholder?: string;
	field?: string;
};

function RadioButtons(props: Props) {
	const { options = [], name, onChange, value, showError = false, errorMessage = "", placeholder, disabled = false, field = "text" } = props;

	return (
		<div className={styles["radio-buttons-wrapper"]}>
			{placeholder && <span className={styles["title"]}>{placeholder}</span>}
			<div className={styles["inputs"]}>
				{options.map((option) => {
					return (
						<RadioButton
							key={"option" + option._id}
							id={option._id}
							name={name}
							text={option[field]}
							onChange={onChange}
							value={value}
							disabled={disabled}
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

export default RadioButtons;
