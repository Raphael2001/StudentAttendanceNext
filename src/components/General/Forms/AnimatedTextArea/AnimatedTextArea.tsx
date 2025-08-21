import React, { ChangeEventHandler, useState } from "react";

import styles from "./AnimatedTextArea.module.scss";
import AnimatedPlaceholder from "components/General/Basic/AnimatedPlaceholder/AnimatedPlaceholder";
import BasicTextArea from "components/General/Basic/BasicTextArea/BasicTextArea";
import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";
import { generateUniqueId } from "utils/functions";
import useInputAccessibility from "utils/hooks/useInputAccessibility";
import { TextAreaRef } from "utils/types/form";

type Props = {
	value: string | number;
	onChange: ChangeEventHandler;
	name?: string;
	id?: string;
	placeholder?: string;
	disabled?: boolean;

	onFocus?: () => void;
	onBlur?: () => void;

	className?: string;
	rows?: number;
	showError?: boolean;
	errorMessage?: string;
	ariaLabel?: string;
	required?: boolean;
	ref?: TextAreaRef;
};

function AnimateTextArea(props: Props) {
	const {
		value,
		onChange,
		id = generateUniqueId(16),
		name = "",
		placeholder = "",
		disabled = false,
		onFocus = () => {},
		onBlur = () => {},
		className = "",
		showError = false,
		errorMessage = "",
		rows = 1,
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
		<div className={`${styles["animated-textarea-wrapper"]} ${className} `}>
			<BasicTextArea
				value={value}
				name={name}
				id={id}
				onChange={onChange}
				onFocus={onFocusHandler}
				onBlur={onBlurHandler}
				disabled={disabled}
				rows={rows}
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

export default AnimateTextArea;
