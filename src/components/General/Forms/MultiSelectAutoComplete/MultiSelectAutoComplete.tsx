"use client";

import React, { useRef, useState } from "react";

import styles from "./MultiSelectAutoComplete.module.scss";
import { useOutsideClick } from "utils/hooks/useOutsideClick";
import TextInput from "components/General/Forms/TextInput/TextInput";
import { GeneralOptionItem, InputEvent } from "utils/types/inputs";
import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";
import OptionsList from "components/General/Basic/OptionsList/OptionsList";
import useHighlightedItem from "utils/hooks/useHighlightedItem";
import { clsx } from "utils/functions";
import SelectedOptions from "components/General/Basic/SelectedOptions/SelectedOptions";
import { MultiSelectAutoCompleteProps } from "utils/types/form";

function MultiSelectAutoComplete(props: MultiSelectAutoCompleteProps) {
	const {
		options = [],
		showError = false,
		errorMessage = "",
		id = "",
		name = "",
		onChange,
		value = [],
		placeholder = "",
		field = "text",
		className,
		disabled = false,
		ref,
	} = props;

	const [input, setInput] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const { highlightedItem, filteredOptions, handleKeyDown } = useHighlightedItem({
		options,
		field,
		onOptionClick,
		query: input,
		isOpen,
		setIsOpen,
		name,
	});

	const wrapperRef = useRef(null);
	useOutsideClick(wrapperRef, closeList);

	function onChangeInput(e: InputEvent) {
		const { value } = e.target;

		setInput(value);
	}

	function onOptionClick(item: GeneralOptionItem) {
		onChange(name, item);
		closeList();
	}

	function closeList() {
		setIsOpen(false);
	}

	return (
		<div
			className={clsx(styles["autocomplete-wrapper"], className)}
			ref={wrapperRef}
		>
			<TextInput
				onChange={onChangeInput}
				placeholder={placeholder}
				value={input}
				onFocus={() => setIsOpen(true)}
				disabled={disabled}
				onKeyDown={handleKeyDown}
				id={id}
				ref={ref}
			/>
			<SelectedOptions
				value={value}
				options={options}
				field={field}
				onClick={onOptionClick}
			/>
			<OptionsList
				query={input}
				options={filteredOptions}
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

export default MultiSelectAutoComplete;
