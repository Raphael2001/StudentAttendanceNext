"use client";

import React, { useRef, useState } from "react";

import styles from "./MultiSelect.module.scss";
import { useOutsideClick } from "utils/hooks/useOutsideClick";

import { GeneralOptionItem } from "utils/types/inputs";
import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";
import OptionsList from "components/General/Basic/OptionsList/OptionsList";
import useHighlightedItem from "utils/hooks/useHighlightedItem";

import { clsx, generateUniqueId } from "utils/functions";
import SelectedOptions from "components/General/Basic/SelectedOptions/SelectedOptions";
import FormButton from "components/General/Forms/FormButton/FormButton";
import { ButtonRef } from "utils/types/form";

type Props = {
	options: Array<GeneralOptionItem>;
	showError?: boolean;
	errorMessage?: string;
	id?: string;
	name?: string;
	onChange: (name: string, option: GeneralOptionItem) => void;
	value: Array<string>;
	placeholder?: string;
	className?: string;
	field?: string;
	disabled?: boolean;
	ref?: ButtonRef;
};

function MultiSelect(props: Props) {
	const {
		options = [],
		showError = false,
		errorMessage = "",
		id = generateUniqueId(16),
		name = "",
		onChange,
		value = [],
		placeholder = "",
		field = "text",
		className,
		disabled = false,
		ref,
	} = props;

	const [isOpen, setIsOpen] = useState(false);

	const { handleKeyDown } = useHighlightedItem({
		options,
		field,
		onOptionClick,
		isOpen,
		setIsOpen,
		name,
	});

	const wrapperRef = useRef(null);
	useOutsideClick(wrapperRef, closeList);

	function onOptionClick(item) {
		onChange(name, item);
		closeList();
	}

	function closeList() {
		setIsOpen(false);
	}

	return (
		<div
			className={clsx(styles["multi-select-wrapper"], className)}
			ref={wrapperRef}
		>
			<FormButton
				id={id}
				ref={ref}
				className={`${styles["button-select"]} ${disabled ? styles["disabled"] : ""}`}
				disabled={disabled}
				onFocus={() => setIsOpen(true)}
				onClick={() => setIsOpen((prevState) => !prevState)}
				onKeyDown={handleKeyDown}
			>
				<span className={styles["placeholder"]}>{placeholder}</span>
			</FormButton>
			<SelectedOptions
				value={value}
				options={options}
				field={field}
				onClick={onOptionClick}
			/>
			<OptionsList
				options={options}
				field={field}
				onOptionClick={onOptionClick}
				isOpen={isOpen}
				name={name}
			/>

			<BasicInputErrorMsg
				showError={showError}
				errorMessage={errorMessage}
			/>
		</div>
	);
}

export default MultiSelect;
