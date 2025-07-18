"use client";

import React, { ChangeEventHandler, useEffect, useRef } from "react";

import styles from "./AutoGrowTextArea.module.scss";
import BasicTextArea from "components/General/Basic/BasicTextArea/BasicTextArea";
import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";
import useInputAccessibility from "utils/hooks/useInputAccessibility";
import { TextAreaRef } from "utils/types/form";
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

	className?: string;
	rows?: number;
	showError?: boolean;
	errorMessage?: string;
	ariaLabel?: string;
	required?: boolean;
	ref?: TextAreaRef;
};

function AutoGrowTextArea(props: Props) {
	const {
		value,
		onChange,
		id = "",
		name = "",
		placeholder = "",
		disabled = false,
		onFocus = () => {},
		onBlur = () => {},
		className = "",
		showError = false,
		errorMessage = "",
		ariaLabel = "",
		required = false,
		ref,
	} = props;

	const textArea = useRef<HTMLTextAreaElement>(null);

	const accessibilityProps = useInputAccessibility({
		ariaLabel,
		showError,
		required,
		placeholder,
		name,
	});

	const textAreaRef = ref || textArea;

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "inherit";
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
		}
	}, [textAreaRef.current, value]);

	return (
		<div className={styles["text-area-wrapper"]}>
			<BasicTextArea
				ref={textAreaRef}
				rows={1}
				onChange={onChange}
				className={clsx(styles["text-area"], className)}
				name={name}
				id={id}
				disabled={disabled}
				placeholder={placeholder}
				onBlur={onBlur}
				onFocus={onFocus}
				value={value}
				{...accessibilityProps}
			/>

			<BasicInputErrorMsg
				showError={showError}
				errorMessage={errorMessage}
			/>
		</div>
	);
}

export default AutoGrowTextArea;
