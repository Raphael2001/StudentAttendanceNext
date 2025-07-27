"use client";

import React, { useRef, useState } from "react";

import styles from "./Select.module.scss";
import OptionsList from "components/General/Basic/OptionsList/OptionsList";
import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";
import { useOutsideClick } from "utils/hooks/useOutsideClick";
import useHighlightedItem from "utils/hooks/useHighlightedItem";
import { clsx, generateUniqueId } from "utils/functions";
import FormButton from "components/General/Forms/FormButton/FormButton";
import { SelectProps } from "utils/types/form";

function Select(props: SelectProps) {
	const {
		options = [],
		showError = false,
		errorMessage = "",
		id = generateUniqueId(16),
		name = "",
		onChange,
		value = "",
		placeholder = "",
		field = "text",
		className,
		disabled = false,
		ref,
	} = props;

	const [isOpen, setIsOpen] = useState(false);

	const foundItem = options.find((item) => item._id === value);

	const { highlightedItem, handleKeyDown } = useHighlightedItem({
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
			className={clsx(styles["select-wrapper"], className)}
			ref={wrapperRef}
		>
			<FormButton
				ref={ref}
				id={id}
				className={clsx(styles["button-select"], disabled ? styles["disabled"] : "")}
				disabled={disabled}
				onFocus={() => setIsOpen(true)}
				onClick={() => setIsOpen((prevState) => !prevState)}
				onKeyDown={handleKeyDown}
			>
				{foundItem ? (
					<span className={styles["select-text"]}>{foundItem[field]}</span>
				) : (
					<span className={styles["placeholder"]}>{placeholder}</span>
				)}
			</FormButton>

			<OptionsList
				options={options}
				field={field}
				onOptionClick={onOptionClick}
				isOpen={isOpen}
				name={name}
				highlightedItem={highlightedItem}
			/>

			<BasicInputErrorMsg
				showError={showError}
				errorMessage={errorMessage}
			/>
		</div>
	);
}

export default Select;
