import React, { HTMLInputTypeAttribute } from "react";

import styles from "./TextInput.module.scss";
import { InputEvent, OnKeyDownInput } from "utils/types/inputs";
import BasicInput from "components/General/Basic/BasicInput/BasicInput";
import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";
import useInputAccessibility from "utils/hooks/useInputAccessibility";
import { clsx, generateUniqueId } from "utils/functions";
import { InputRef } from "utils/types/form";

type Props = {
	value: string | number;
	onChange: (e: InputEvent) => void;
	id?: string;
	name?: string;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	showError?: boolean;
	errorMessage?: string;
	onFocus?: () => void;
	onBlur?: () => void;
	type?: HTMLInputTypeAttribute;
	onKeyDown?: (e: OnKeyDownInput) => void;
	ariaLabel?: string;
	required?: boolean;
	ref?: InputRef;
};

function TextInput(props: Props) {
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
		onFocus = () => {},
		onBlur = () => {},
		onKeyDown = () => {},
		ariaLabel = "",
		required = false,
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
		<div className={clsx(styles["cms-input-wrapper"], className)}>
			<BasicInput
				value={value}
				onChange={onChange}
				name={name}
				id={id}
				placeholder={placeholder}
				type={type}
				disabled={disabled}
				onFocus={onFocus}
				onBlur={onBlur}
				ref={ref}
				className={className}
				onKeyDown={onKeyDown}
				{...accessibilityProps}
			/>
			<BasicInputErrorMsg
				showError={showError}
				errorMessage={errorMessage}
			/>
		</div>
	);
}

export default TextInput;
