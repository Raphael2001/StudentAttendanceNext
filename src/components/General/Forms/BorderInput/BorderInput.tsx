"use client";

import React, { ChangeEventHandler } from "react";

import styles from "./BorderInput.module.scss";
import { clsx, generateUniqueId } from "utils/functions";
import useInputAccessibility from "utils/hooks/useInputAccessibility";
import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";
import BasicInput from "components/General/Basic/BasicInput/BasicInput";
import { InputRef } from "utils/types/form";

type Props = {
	value: string | number;
	onChange: ChangeEventHandler;
	id?: string;
	name?: string;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	showError?: boolean;
	errorMessage?: string;
	type?: string;
	ariaLabel?: string;
	required?: boolean;
	title?: string;
	ref?: InputRef;
};

function BorderInput(props: Props) {
	const {
		value,
		onChange,
		id = generateUniqueId(16),
		name = "",
		className = "",
		placeholder = "",
		type = "",
		disabled = false,
		showError = false,
		errorMessage = "",
		ariaLabel = "",
		required = false,
		title = "",
		ref,
	} = props;

	const accessibilityProps = useInputAccessibility({
		ariaLabel,
		showError,
		required,
		placeholder,
		name,
	});

	return (
		<div className={clsx(styles["input-wrapper"], className)}>
			<span className={styles["title"]}>{title}</span>
			<BasicInput
				value={value}
				onChange={onChange}
				name={name}
				id={id}
				placeholder={placeholder}
				type={type}
				disabled={disabled}
				className={styles["input"]}
				ref={ref}
				{...accessibilityProps}
			/>

			<BasicInputErrorMsg
				showError={showError}
				errorMessage={errorMessage}
			/>
		</div>
	);
}

export default BorderInput;
