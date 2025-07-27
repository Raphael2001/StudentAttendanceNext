import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

import styles from "./BasicInput.module.scss";
import { OnKeyDownInput } from "utils/types/inputs";
import { InputAccessibility, InputRef } from "utils/types/form";
import { clsx } from "utils/functions";

type Props = {
	value: string | number;
	onChange: ChangeEventHandler;
	name?: string;
	id?: string;
	placeholder?: string;
	disabled?: boolean;
	onFocus?: () => void;
	onBlur?: () => void;
	type?: HTMLInputTypeAttribute;
	className?: string;
	onKeyDown?: (e: OnKeyDownInput) => void;
	ref?: InputRef;
};

function BasicInput(props: Props & InputAccessibility) {
	const {
		value,
		onChange,
		id = "",
		name = "",
		placeholder = "",
		type = "",
		disabled = false,
		onFocus = () => {},
		onBlur = () => {},
		className = "",
		onKeyDown = () => {},
		ariaRequired = false,
		ariaInvalid = false,
		ariaLabel = "",
		ariaLabelledBy = "",
		ref,
	} = props;

	const exceptThisSymbols = ["e", "E", "+", "-", "."];

	function onKeyDownHandler(e: OnKeyDownInput) {
		if (type === "number" && exceptThisSymbols.includes(e.key)) {
			e.preventDefault();
		}
		typeof onKeyDown === "function" && onKeyDown(e);
	}

	return (
		<input
			value={value}
			onChange={onChange}
			name={name}
			id={id}
			className={clsx(styles["input"], disabled ? styles["disabled"] : "", className)}
			placeholder={placeholder}
			type={type}
			pattern={type === "number" ? "[0-9]*" : ".{0,}"}
			disabled={disabled}
			onFocus={onFocus}
			onBlur={onBlur}
			ref={ref}
			onKeyDown={onKeyDownHandler}
			aria-required={ariaRequired}
			aria-invalid={ariaInvalid}
			aria-labelledby={ariaLabelledBy}
			aria-label={ariaLabel}
		/>
	);
}

export default BasicInput;
