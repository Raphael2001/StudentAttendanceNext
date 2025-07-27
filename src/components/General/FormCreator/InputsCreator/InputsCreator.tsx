"use client";

import React, { useEffect, useMemo, useState } from "react";

import styles from "./InputsCreator.module.scss";

import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import { GeneralOptionItem, InputEvent } from "utils/types/inputs";
import { FormInputData, OnChangeValue, FormRef, InputRef, TextAreaRef, ButtonRef } from "utils/types/form";

import TextInput from "components/General/Forms/TextInput/TextInput";
import AutoComplete from "components/General/Forms/AutoComplete/AutoComplete";
import RadioButtons from "components/General/Forms/RadioButtons/RadioButtons";
import Select from "components/General/Forms/Select/Select";
import AnimatedInput from "components/General/Forms/AnimatedInput/AnimatedInput";
import BasicTextArea from "components/General/Basic/BasicTextArea/BasicTextArea";
import AnimateTextArea from "components/General/Forms/AnimatedTextArea/AnimatedTextArea";
import AutoGrowTextArea from "components/General/Forms/AutoGrowTextArea/AutoGrowTextArea";
import AnimatedAutoGrowTextArea from "components/General/Forms/AnimatedAutoGrowTextArea/AnimatedAutoGrowTextArea";
import UploadFileButton from "components/General/Forms/UploadFileButton/UploadFileButton";
import CheckBoxes from "components/General/Forms/CheckBoxes/CheckBoxes";
import BitwiseCheckbox from "components/General/Forms/CheckBoxes/BitwiseCheckboxes";
import MultiSelectAutoComplete from "components/General/Forms/MultiSelectAutoComplete/MultiSelectAutoComplete";
import TableCreator from "components/General/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import TimePicker from "components/General/Forms/TimePicker/TimePicker";
import CustomDatePicker from "components/General/Forms/DatePicker/CustomDatePicker";
import BorderInput from "components/General/Forms/BorderInput/BorderInput";
import CheckBox from "components/General/Forms/CheckBox/CheckBox";
import MultiSelect from "components/General/Forms/MultiSelect/MultiSelect";
import Editor from "components/General/Forms/Editor/Editor";
import MediaAutoComplete from "components/General/Forms/PreBuiltData/AutoComplete/MediaAutoComplete";
import MediaMultiSelectAutoComplete from "components/General/Forms/PreBuiltData/MultiSelectAutoComplete/MediaMultiSelectAutoComplete";
import LanguageSelect from "components/General/Forms/PreBuiltData/Select/LanguageSelect";
import StarRatingInput from "components/General/Forms/StarRatingInput/StarRatingInput";

type Props = {
	input: FormInputData;
	onChange: (name: string, value: OnChangeValue) => void;
	showError: (name: string) => boolean;
	value: OnChangeValue;
	errorMessage?: string;
	deleteInput: (name: string) => void;
	ref: FormRef;
};

function InputsCreator(props: Props) {
	const { input, showError, onChange, value, errorMessage = "", deleteInput = () => {}, ref } = props;
	const {
		inputType,
		label,
		name,
		options = [],
		field = "text",
		isDisabled = false,
		rows = 10,
		type = "text",
		accept = "*",
		ariaLabel,
		required,
		bitwiseField = "bitwise",
		showDataTable = false,
		tableHeaderData = [],
		enableDrag = false,
		endHour,
		minuteInterval,
		startHour,
		endYear,
		minDate,
		startYear,
		title,
		id,
		language,
		showDeleteInputButton = false,
		max,
	} = input;

	const [tableHeader, setTableHeader] = useState({});
	const [isInputReady, setIsInputReady] = useState(false);

	const optionsItems = useMemo(() => {
		if (Array.isArray(options) && Array.isArray(value)) {
			const filteredOptions = options.filter((item) => value.includes(item._id));
			const sortedOptions = value.map((id) => filteredOptions.find((item) => item._id === id)).filter((item) => item);
			return sortedOptions;
		}
		return [];
	}, [options, value]);

	useEffect(() => {
		if (tableHeaderData && showDataTable) {
			const data = {};
			for (const item of tableHeaderData) {
				const itemData = {
					title: item.title,
					type: TABLE_CELL_TYPES.TEXT,
				};
				data[item.name] = itemData;
			}
			setTableHeader(data);
		}
	}, [tableHeaderData]);

	useEffect(() => {
		if (inputType !== FORM_INPUTS_TYPES.EDITOR) {
			setIsInputReady(true);
		}
	}, []);

	function onChangeInput(e: InputEvent) {
		const { name, value } = e.target;
		onChange(name, value);
	}

	function onChangeAutoComplete(name: string, option: GeneralOptionItem | null) {
		if (option) {
			onChange(name, option._id);
		} else {
			onChange(name, "");
		}
	}

	function onChangeRadio(e: InputEvent) {
		const { id, name } = e.target;

		onChange(name, id);
	}

	function onChangeCheckboxes(e: InputEvent) {
		const { id, name } = e.target;

		if (Array.isArray(value)) {
			let newData = [...value];
			if (Array.isArray(value) && value.includes(id)) {
				// remove from array
				newData = newData.filter((t) => t !== id);
			} else {
				newData.push(id);
			}

			onChange(name, newData);
		}
	}

	function onChangeOptionsBitwise(e: InputEvent) {
		const { id, name } = e.target;
		const option = options.find((o) => o._id === id);

		const bitwiseValue = Number(option[bitwiseField]);
		const valueAsNumber = Number(value);

		if (bitwiseValue & valueAsNumber) {
			onChange(name, valueAsNumber - bitwiseValue);
		} else {
			onChange(name, valueAsNumber + bitwiseValue);
		}
	}

	function onChangeMultiSelect(name: string, option: GeneralOptionItem) {
		if (option) {
			const id = option._id;
			if (Array.isArray(value)) {
				if (value.includes(id)) {
					const data = value.filter((o) => o !== id);
					return onChange(name, data);
				} else {
					return onChange(name, [...value, id]);
				}
			}
			return onChange(name, [id]);
		}
		return onChange(name, []);
	}

	function onFileChange(e: InputEvent) {
		const fileList = e.target.files;
		if (fileList) {
			for (let i = 0; i < fileList.length; i++) {
				const file = fileList[i];
				return onChange(name, file);
			}
		}
	}

	function onChangeItemsPosition(data: Array<GeneralOptionItem>) {
		const idList: Array<string> = [];
		for (const item of data) {
			idList.push(item._id);
		}

		return onChange(name, idList);
	}

	function onChangeTimePicker(name: string, phase: "minute" | "hour", time: string) {
		if (typeof value === "object") {
			const data = { ...value, [phase]: time };
			return onChange(name, data);
		}
	}
	function onChangeDatePicker(name: string, date: Date) {
		onChange(name, date);
	}

	function onChangeCheckbox(e: InputEvent) {
		const { name, checked } = e.target;

		onChange(name, checked);
	}

	function onChangeStarRating(name: string, value: number) {
		onChange(name, value);
	}

	function formatValue(value) {
		if (typeof value === "string") {
			return value.toString();
		} else if (Array.isArray(value)) {
			return value;
		}
		if (value instanceof File) {
			return value;
		}
		if (typeof value === "object") {
			return value;
		}
		if (value instanceof Date) {
			return value;
		}

		return value;
	}

	function onInputReady() {
		setIsInputReady(true);
	}

	const shouldShowError = showError(name);

	const currentValue = useMemo(() => formatValue(value), [value]);

	const sharedInputProps = {
		placeholder: label,
		showError: shouldShowError,
		errorMessage: errorMessage,
		value: currentValue,
		name: name,
		disabled: isDisabled,
		ariaLabel,
		required,
		id: id,
	};

	let component;
	switch (inputType) {
		case FORM_INPUTS_TYPES.INPUT:
			component = (
				<TextInput
					onChange={onChangeInput}
					{...sharedInputProps}
					type={type}
					ref={ref as InputRef}
				/>
			);
			break;
		case FORM_INPUTS_TYPES.AUTO_COMPLETE:
			component = (
				<AutoComplete
					options={options}
					onChange={onChangeAutoComplete}
					{...sharedInputProps}
					field={field}
					ref={ref as InputRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.MULTI_SELECT_AUTO_COMPLETE:
			component = (
				<MultiSelectAutoComplete
					options={options}
					onChange={onChangeMultiSelect}
					{...sharedInputProps}
					field={field}
					ref={ref as InputRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.RADIO:
			component = (
				<RadioButtons
					{...sharedInputProps}
					onChange={onChangeRadio}
					options={options}
					field={field}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.SELECT:
			component = (
				<Select
					{...sharedInputProps}
					onChange={onChangeAutoComplete}
					options={options}
					field={field}
					ref={ref as ButtonRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.ANIMATED_INPUT:
			component = (
				<AnimatedInput
					{...sharedInputProps}
					onChange={onChangeInput}
					type={type}
					ref={ref as InputRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.TEXT_AREA:
			component = (
				<BasicTextArea
					{...sharedInputProps}
					onChange={onChangeInput}
					rows={rows}
					ref={ref as TextAreaRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.ANIMATED_TEXT_AREA:
			component = (
				<AnimateTextArea
					{...sharedInputProps}
					onChange={onChangeInput}
					rows={rows}
					ref={ref as TextAreaRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.AUTO_GROW_TEXT_AREA:
			component = (
				<AutoGrowTextArea
					{...sharedInputProps}
					onChange={onChangeInput}
					ref={ref as TextAreaRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.ANIMATED_AUTO_GROW_TEXT_AREA:
			component = (
				<AnimatedAutoGrowTextArea
					{...sharedInputProps}
					onChange={onChangeInput}
					ref={ref as TextAreaRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.FILE_UPLOAD:
			component = (
				<UploadFileButton
					{...sharedInputProps}
					onChange={onFileChange}
					accept={accept}
					ref={ref as InputRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.CHECKBOXES:
			component = (
				<CheckBoxes
					{...sharedInputProps}
					onChange={onChangeCheckboxes}
					options={options}
					field={field}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.CHECKBOX:
			component = (
				<CheckBox
					{...sharedInputProps}
					onChange={onChangeCheckbox}
					id={name}
					label={label}
					ref={ref as InputRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.BITWISE_CHECKBOX:
			component = (
				<BitwiseCheckbox
					{...sharedInputProps}
					onChange={onChangeOptionsBitwise}
					options={options}
					field={field}
					bitwiseValueField={bitwiseField}
				/>
			);
			break;
		case FORM_INPUTS_TYPES.TIME_PICKER:
			const hour = currentValue?.hour;
			const minute = currentValue?.minute;
			component = (
				<TimePicker
					{...sharedInputProps}
					onPicked={onChangeTimePicker}
					selectedHour={hour}
					selectedMinute={minute}
					endHour={endHour}
					startHour={startHour}
					minuteInterval={minuteInterval}
					ref={ref as ButtonRef}
				/>
			);
			break;
		case FORM_INPUTS_TYPES.DATE_PICKER:
			component = (
				<CustomDatePicker
					{...sharedInputProps}
					onChange={onChangeDatePicker}
					endYear={endYear}
					startYear={startYear}
					minDate={minDate}
					ref={ref as ButtonRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.BORDER_INPUT:
			component = (
				<BorderInput
					{...sharedInputProps}
					onChange={onChangeInput}
					type={type}
					title={title}
					ref={ref as InputRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.MULTI_SELECT:
			component = (
				<MultiSelect
					options={options}
					onChange={onChangeMultiSelect}
					{...sharedInputProps}
					field={field}
					ref={ref as ButtonRef}
				/>
			);
			break;

		case FORM_INPUTS_TYPES.EDITOR:
			component = (
				<Editor
					{...sharedInputProps}
					onChange={onChange}
					language={language}
					onReady={onInputReady}
				/>
			);
			break;
		case FORM_INPUTS_TYPES.MEDIA:
			component = (
				<MediaAutoComplete
					{...sharedInputProps}
					onChange={onChangeAutoComplete}
					ref={ref as InputRef}
				/>
			);
			break;
		case FORM_INPUTS_TYPES.MEDIA_MULTI_SELECT:
			component = (
				<MediaMultiSelectAutoComplete
					{...sharedInputProps}
					onChange={onChangeMultiSelect}
					ref={ref as InputRef}
				/>
			);
			break;
		case FORM_INPUTS_TYPES.LANGUAGE_SELECT:
			component = (
				<LanguageSelect
					{...sharedInputProps}
					onChange={onChangeAutoComplete}
					ref={ref as ButtonRef}
				/>
			);
			break;
		case FORM_INPUTS_TYPES.RATING_INPUT:
			component = (
				<StarRatingInput
					{...sharedInputProps}
					onChange={onChangeStarRating}
					max={max}
				/>
			);
			break;

		default:
			component = null;
			break;
	}

	function onDeleteIconClick(e) {
		e.preventDefault();
		deleteInput(name);
	}

	const showTable = !!(showDataTable && Array.isArray(optionsItems) && Object.keys(optionsItems).length);

	return (
		<div className={styles["input-content"]}>
			<div className={styles["input-wrapper"]}>
				{component && component}

				{showDeleteInputButton && isInputReady && (
					<button
						className={styles["delete-input-button"]}
						onClick={onDeleteIconClick}
					>
						<img
							src={"/assets/icons/trash.svg"}
							alt="delete"
							className={styles["icon"]}
						/>
					</button>
				)}
			</div>
			{showTable && (
				<TableCreator
					header={tableHeader}
					data={optionsItems}
					onChangeItems={onChangeItemsPosition}
					enableDrag={enableDrag}
				/>
			)}
		</div>
	);
}

export default InputsCreator;
