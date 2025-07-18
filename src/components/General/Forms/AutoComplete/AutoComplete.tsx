"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./AutoComplete.module.scss";
import { useOutsideClick } from "utils/hooks/useOutsideClick";
import TextInput from "components/General/Forms/TextInput/TextInput";
import { InputEvent } from "utils/types/inputs";
import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";
import OptionsList from "components/General/Basic/OptionsList/OptionsList";
import useHighlightedItem from "utils/hooks/useHighlightedItem";
import { clsx } from "utils/functions";
import { AutoCompleteProps } from "utils/types/form";

function AutoComplete(props: AutoCompleteProps) {
	const {
		options = [],
		showError = false,
		errorMessage = "",
		id = "",
		name = "",
		onChange,
		value = "",
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

	useEffect(() => {
		if (Array.isArray(options) && options.length > 0 && value) {
			const item = options.find((item) => item._id.toLowerCase() === value.toLowerCase());

			if (item) {
				setInput(item[field]);
			}
		}
	}, [value, options]);

	const wrapperRef = useRef(null);
	useOutsideClick(wrapperRef, closeList);

	function onChangeInput(e: InputEvent) {
		const { value } = e.target;
		onChange(name, null);

		setInput(value);
	}

	function onOptionClick(item) {
		setInput(item[field]);

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
				ref={ref}
				onChange={onChangeInput}
				placeholder={placeholder}
				value={input}
				onFocus={() => setIsOpen(true)}
				disabled={disabled}
				onKeyDown={handleKeyDown}
				name={name}
				id={id}
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

export default AutoComplete;
