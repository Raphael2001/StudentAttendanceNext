"use client";

import React, { useRef, useState } from "react";

import styles from "./InputCell.module.scss";
import TextInput from "components/General/Forms/TextInput/TextInput";
import { InputEvent } from "utils/types/inputs";

import { useOutsideClick } from "utils/hooks/useOutsideClick";
import { CellInput } from "utils/types/table";

type Props = {
	name: string;
	onChange: (e: CellInput) => void;
	field: string;
	data: any;
};

function InputCell({ name, onChange, data, field }: Props) {
	const initialValue = data[name] ?? "";

	const [value, setValue] = useState(initialValue);
	const [isFocused, setIsFocused] = useState(false);
	const [isFocusedIcon, setIsFocusedIcon] = useState(false);
	const ref = useRef<HTMLInputElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	useOutsideClick(wrapperRef, loseAllFocus);

	const id = data[field] ?? "";

	function onFocus() {
		setIsFocused(true);
		setIsFocusedIcon(true);
		ref.current?.focus();
	}

	function onChangeHandler(e: InputEvent) {
		const { target } = e;
		const { value } = target;
		setValue(value);
	}

	function loseAllFocus() {
		ref.current?.blur();
		setIsFocusedIcon(false);
		setIsFocused(false);
	}

	function clearValue() {
		setValue("");
	}

	function onCheckClick() {
		loseAllFocus();
		const inputValue = {
			value,
			id,
			name,
		};
		onChange(inputValue);
	}

	return (
		<div
			className={styles["input-wrapper"]}
			ref={wrapperRef}
		>
			<div className={styles["input"]}>
				<TextInput
					onFocus={onFocus}
					value={value}
					onChange={onChangeHandler}
					name={name}
					ref={ref}
					id={id}
				/>
			</div>
			{(isFocused || isFocusedIcon) && (
				<div className={styles["actions"]}>
					<button
						className={`input-icon-mark ${styles["icon"]}`}
						onFocus={onFocus}
						onClick={onCheckClick}
					>
						<img
							src={"/assets/icons/check-mark-black.svg"}
							alt={"checkmark"}
						/>
					</button>
					<button
						className={`input-icon-mark ${styles["icon"]}`}
						onFocus={onFocus}
						onClick={clearValue}
					>
						<img
							src={"assets/icons/x-black.svg"}
							alt={"close"}
						/>
					</button>
				</div>
			)}
		</div>
	);
}

export default InputCell;
