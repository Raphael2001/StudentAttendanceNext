"use client";

import React, { ChangeEventHandler } from "react";

import styles from "./UploadFileButton.module.scss";
import { clsx, generateUniqueId } from "utils/functions";
import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";
import { InputRef } from "utils/types/form";

type Props = {
	accept?: string;
	onChange: ChangeEventHandler;
	placeholder: string;
	name?: string;
	className?: string;
	showError?: boolean;
	errorMessage?: string;
	id?: string;
	disabled?: boolean;
	value?: File;
	inputClassName?: string;
	ref?: InputRef;
};

const UploadFileButton = (props: Props) => {
	const {
		accept = "*",
		onChange = () => {},
		placeholder,
		name = "",
		className = "",
		disabled = false,
		showError = false,
		errorMessage = "",
		id = generateUniqueId(16),
		value,
		inputClassName = "",
		ref,
	} = props;

	function renderButton() {
		return (
			<>
				<input
					id={id}
					className={styles["media-file"]}
					type="file"
					accept={accept}
					onChange={onChange}
					name={name}
					disabled={disabled}
					ref={ref}
				/>
				<label
					htmlFor={id}
					className={clsx(styles["media-file-label"], disabled ? styles["disabled"] : "", inputClassName)}
				>
					{placeholder}
				</label>
			</>
		);
	}

	return (
		<div className={clsx(styles["file-input-wrapper"], className)}>
			{renderButton()}
			{value && <span className={styles["file-name-title"]}>{value.name}</span>}
			<BasicInputErrorMsg
				showError={showError}
				errorMessage={errorMessage}
			/>
		</div>
	);
};

export default UploadFileButton;
