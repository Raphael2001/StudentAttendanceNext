import { onChangeCheckboxValue } from "./inputs";

export interface TableAction {
  icon?: string;
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

export interface cellInput {
  value: string | number;
  id: string;
  name: string;
}

export interface TableHeaderItem {
  title: string;
  type: string;
  options?: TableColorCell;
  uniqueField?: string;
  onChangeCheckbox?: (value: onChangeCheckboxValue) => void;
  actions?: Array<TableAction>;
  onChangeInput?: (e: cellInput) => void;
  dataset?: Array<datasetItem>;
  displayField?: string;
  onOptionClick?: TableColorCellOptionClick;
}

type datasetItem = {
  _id: string;
};

export interface TableHeader {
  [key: string]: TableHeaderItem;
}

export type TableColorCellOptionClick = (
  id: string,
  item: TableColorCellOption
) => void;
