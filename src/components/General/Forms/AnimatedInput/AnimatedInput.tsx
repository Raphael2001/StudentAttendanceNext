import React, { ChangeEventHandler, useState } from "react";

import styles from "./AnimatedInput.module.scss";
import BasicInput from "components/General/Basic/BasicInput/BasicInput";

import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";
import AnimatedPlaceholder from "components/General/Basic/AnimatedPlaceholder/AnimatedPlaceholder";
import useInputAccessibility from "utils/hooks/useInputAccessibility";
import { clsx, generateUniqueId } from "utils/functions";
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
	onFocus?: () => void;
	onBlur?: () => void;
	type?: string;
	ariaLabel?: string;
	required?: boolean;
	ref?: InputRef;
};

function AnimatedInput(props: Props) {
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

	const [isFocus, setIsFocus] = useState(false);

	function onFocusHandler() {
		setIsFocus(true);
		typeof onFocus === "function" && onFocus();
	}
	function onBlurHandler() {
		setIsFocus(false);
		typeof onBlur === "function" && onBlur();
	}

	const isAnimated = !!value || isFocus;

	return (
		// Input wrapper
		<div className={clsx(styles["animated-input-wrapper"], className)}>
			<BasicInput
				value={value}
				onChange={onChange}
				name={name}
				id={id}
				type={type}
				disabled={disabled}
				onFocus={onFocusHandler}
				onBlur={onBlurHandler}
				ref={ref}
				{...accessibilityProps}
			/>

			<AnimatedPlaceholder
				id={id}
				placeholder={placeholder}
				isAnimated={isAnimated}
				isFocus={isFocus}
			/>

			<BasicInputErrorMsg
				showError={showError}
				errorMessage={errorMessage}
			/>
		</div>
	);
}

export default AnimatedInput;
