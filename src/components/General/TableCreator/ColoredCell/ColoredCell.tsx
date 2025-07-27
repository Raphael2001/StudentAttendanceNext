import React, { useRef, useState } from "react";

import styles from "./ColoredCell.module.scss";
import { TableColorCell, TableColorCellOption, TableColorCellOptionClick } from "utils/types/table";
import { clsx, generateUniqueId } from "utils/functions";
import { useOutsideClick } from "utils/hooks/useOutsideClick";
import Scrollbar from "components/General/ScrollBar/Scrollbar";
import Chevron from "components/General/Svg/Chevron";

type Props = {
	options: TableColorCell;
	value: string;
	onOptionClick?: TableColorCellOptionClick;
	id: string;
};

function ColoredCell({ options, value, onOptionClick, id }: Props) {
	const item = options[value];
	const { color, title } = item;
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef(null);
	useOutsideClick(wrapperRef, closeDropDown);
	const isSelect = typeof onOptionClick === "function";
	function closeDropDown() {
		setIsOpen(false);
	}

	function optionClickHandler(item: TableColorCellOption) {
		typeof onOptionClick === "function" && onOptionClick(id, item);
	}

	return (
		<div className={clsx(styles["colored-cell-container"], isOpen ? styles["active"] : "")}>
			<button
				ref={wrapperRef}
				onClick={() => setIsOpen((prevState) => !prevState)}
				className={clsx(styles["colored-cel-wrapper"], "tag", color, isSelect ? styles["select"] : "")}
			>
				{title}
			</button>
			{isSelect && (
				<>
					<Chevron className={clsx(styles["arrow"], "tag-icon", color)} />

					<SelectOptions
						options={options}
						isOpen={isOpen}
						onOptionClick={optionClickHandler}
					/>
				</>
			)}
		</div>
	);
}

export default ColoredCell;

type SelectProps = {
	options: TableColorCell;
	isOpen: boolean;

	onOptionClick: (item: TableColorCellOption) => void;
};

const defaultId = generateUniqueId(16);

function SelectOptions(props: SelectProps) {
	const { options, isOpen, onOptionClick } = props;
	const optionsItems = Object.values(options);

	return (
		<Scrollbar
			className={clsx(styles["options-wrapper"], isOpen ? styles["active"] : "")}
			contentClassName={styles["options-content"]}
		>
			<>
				{optionsItems.map((item) => {
					return (
						<button
							onClick={() => onOptionClick(item)}
							key={"option" + defaultId + item.id}
							className={clsx(styles["option-item"])}
						>
							{item.title}
						</button>
					);
				})}
			</>
		</Scrollbar>
	);
}
