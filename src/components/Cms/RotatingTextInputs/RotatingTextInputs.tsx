"use client";

import React, { useState } from "react";

import styles from "./RotatingTextInputs.module.scss";
import TextInput from "components/General/Forms/TextInput/TextInput";

import { InputEvent, OptionColor } from "utils/types/inputs";
import CmsButton from "components/Cms/CmsButton/CmsButton";
import TableCreator from "components/General/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import { generateUniqueId } from "utils/functions";
import { TableAction, TableHeader } from "utils/types/table";

import { RotatingTextItem, RotatingTextItemOption } from "utils/types/rotatingText";
import Select from "components/General/Forms/Select/Select";
import COLOR_OPTIONS from "constants/ColorOptions";

import { GeneralInfo, GeneralInfoValue } from "utils/types/init";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import Api from "api";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import Trash from "components/General/Svg/Trash";
import TABLE_COLORS from "constants/TableColors";

type Props = {
	item: GeneralInfo;
	currentValue: GeneralInfoValue;
	onChange: (text: string, options: Array<RotatingTextItemOption>) => void;
};

function isRotatingTextItem(value: GeneralInfoValue): value is RotatingTextItem {
	return typeof value === "object" && value !== null && "text" in value && "options" in value && Array.isArray((value as RotatingTextItem).options);
}

function RotatingTextInputs({ item, onChange, currentValue }: Props) {
	const { _id } = item;
	const { options, text } = isRotatingTextItem(currentValue) ? currentValue : { options: [], text: "" };

	const translate = useCMSTranslate();

	const { onSuccessNotification } = useNotificationsHandler();

	const [newOption, setNewOption] = useState({
		text: {
			value: "",
		},
		color: {
			value: "",
		},
	});

	function onChangeInput(e: InputEvent) {
		const { value } = e.target;

		onChange(value, options);
	}

	function onChangeInputOption(e: InputEvent) {
		const { value } = e.target;
		const newState = { ...newOption };
		newState.text.value = value;
		setNewOption(newState);
	}

	function onChangeSelect(name: string, item: OptionColor) {
		const newState = { ...newOption };
		newState.color.value = item._id;
		setNewOption(newState);
	}

	function addNewOption() {
		const newData: RotatingTextItemOption = {
			text: newOption.text.value,
			_id: generateUniqueId(8),
			color: newOption.color.value,
		};
		onChange(text, [...options, newData]);
		resetNewOption();
	}

	function resetNewOption() {
		const newState = { ...newOption };
		newState.text.value = "";
		newState.color.value = "";
		setNewOption(newState);
	}

	function onDelete(item: RotatingTextItemOption) {
		const updatedOptions = options.filter((option: RotatingTextItemOption) => option._id !== item._id);
		onChange(text, updatedOptions);
	}

	function updateValue() {
		Api.cms.generalInfo.PUT({
			payload: { _id, value: currentValue },
			config: { onSuccess: onSuccessNotification },
		});
	}

	const deleteAction: TableAction = {
		icon: Trash,
		color: TABLE_COLORS.RED,
		onClick: onDelete,
	};

	const tableHeader: TableHeader = {
		text: {
			title: translate("rotating_text_text"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		color: {
			title: translate("rotating_text_color"),
			type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
			dataset: COLOR_OPTIONS,
			displayField: "text",
		},
		actions: {
			title: translate("actions"),
			type: TABLE_CELL_TYPES.ACTION_BUTTONS,
			actions: [deleteAction],
		},
	};

	return (
		<div className={styles["rotating-texts-inputs-wrapper"]}>
			<div className={styles["row"]}>
				<TextInput
					name="text"
					onChange={onChangeInput}
					value={text}
					placeholder={translate("rotating_text_constant_text")}
				/>
				<CmsButton
					text={translate("update_action")}
					onClick={updateValue}
					color="green"
				/>
			</div>
			<div className={styles["row"]}>
				<TextInput
					placeholder={translate("rotating_text_option")}
					value={newOption.text.value}
					onChange={onChangeInputOption}
					name="option"
				/>
				<Select
					placeholder={translate("rotating_text_color")}
					options={COLOR_OPTIONS}
					name="color"
					value={newOption.color.value}
					onChange={onChangeSelect}
				/>

				<CmsButton
					color="blue"
					text={translate("add_action")}
					onClick={addNewOption}
					isDisabled={!newOption.color.value || !newOption.text.value}
				/>
			</div>
			<TableCreator
				header={tableHeader}
				data={options}
			/>
		</div>
	);
}

export default RotatingTextInputs;
