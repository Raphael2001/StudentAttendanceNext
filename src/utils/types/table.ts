import { OnChangeCheckboxValue } from "./inputs";
import { IconType } from "utils/types/svg";

export interface TableAction {
	icon?: IconType;
	text?: string;
	onClick: (item: Object, index?: number) => void;
	color?: string;
}

export interface TableColorCell {
	[key: string]: TableColorCellOption;
}

export type TableColorCellOption = {
	color: string;
	title: string;
	id: string | boolean;
};

export interface CellInput {
	value: string | number;
	id: string;
	name: string;
}

export interface TableHeaderItem {
	title: string;
	type: string;
	options?: TableColorCell;
	uniqueField?: string;
	onChangeCheckbox?: (value: OnChangeCheckboxValue) => void;
	actions?: Array<TableAction>;
	onChangeInput?: (e: CellInput) => void;
	dataset?: Array<DatasetItem>;
	displayField?: string;
	onOptionClick?: TableColorCellOptionClick;
	copyBtn?: boolean;
	searchField?: string;
}

type DatasetItem = {
	_id: string;
};

export interface TableHeader {
	[key: string]: TableHeaderItem;
}

export type TableColorCellOptionClick = (id: string, item: TableColorCellOption) => void;
