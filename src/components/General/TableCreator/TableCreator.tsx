"use client";
import React, { useMemo, useState } from "react";

import styles from "./TableCreator.module.scss";
import { InputEvent } from "utils/types/inputs";
import { useAppSelector } from "utils/hooks/useRedux";

import { TableHeader } from "utils/types/table";
import { clsx } from "utils/functions";
import TableRow from "components/General/TableCreator/TableRow/TableRow";
import { DropWrapper } from "components/General/DnD/Drop/Drop";
import { arrayMove } from "@dnd-kit/sortable";
import { DraggableItem } from "components/General/DnD/Drag/Drag";

type Props = {
	data: Array<Object>;
	header: TableHeader;
	className?: string;
	enableDrag?: boolean;
	onChangeItems?: (data: Array<Object>) => void;
};

function TableCreator({ data, header, className, enableDrag = false, onChangeItems = () => {} }: Props) {
	const columnWidth = 100 / Object.values(header).length;

	const deviceState = useAppSelector((store) => store.deviceState);
	const [selectedCheckboxes, setSelectedCheckbox] = useState<string[]>([]);

	const styleRef = useMemo(() => {
		if (deviceState.isDesktop) {
			return { width: `${columnWidth || 20}%` };
		}
		return {};
	}, [deviceState, columnWidth]);

	function onChangeCheckBox(e: InputEvent) {
		const { target } = e;
		const { id, name } = target;

		const headerItem = header[name];

		const value = {
			id,
			name,
			values: [""],
		};

		if (selectedCheckboxes.includes(id)) {
			const newValues = selectedCheckboxes.filter((item) => item !== id);
			setSelectedCheckbox(newValues);
			value.values = newValues;
		} else {
			const newValues = [...selectedCheckboxes, id];
			setSelectedCheckbox(newValues);
			value.values = newValues;
		}
		typeof headerItem.onChangeCheckbox === "function" && headerItem.onChangeCheckbox(value);
	}

	function renderRowItem({ dataItem }) {
		return (
			<DraggableItem
				id={dataItem._id}
				key={dataItem._id}
				className={styles["table-row-body-wrapper"]}
			>
				<TableRow
					styleRef={styleRef}
					styles={styles}
					dataItem={dataItem}
					header={header}
					selectedCheckboxes={selectedCheckboxes}
					onChangeCheckBox={onChangeCheckBox}
					enableDrag={enableDrag}
				/>
			</DraggableItem>
		);
	}

	function renderOverlayItem(activeItem: any) {
		return renderRowItem({ dataItem: activeItem });
	}

	function onChangeItemsPosition(activeIndex: number, overIndex: number) {
		const newData = arrayMove(data, activeIndex, overIndex);

		onChangeItems(newData);
	}

	return (
		<div className={clsx(styles["table-creator-wrapper"], className)}>
			<div className={clsx(styles["table-row-wrapper"], styles["header-wrapper"])}>
				{Object.values(header).map((headerItem, index) => {
					const title = headerItem.title;
					return (
						<div
							data-th={title}
							key={"table-header-item" + index}
							className={clsx(styles["table-item"], styles["table-header-item"])}
							style={styleRef}
						>
							{title}
						</div>
					);
				})}
			</div>
			<div className={styles["body-wrapper"]}>
				<DropWrapper
					items={data}
					renderOverlayItem={renderOverlayItem}
					onChange={onChangeItemsPosition}
				>
					{Array.isArray(data) &&
						data.map((dataItem) => {
							return renderRowItem({
								dataItem: dataItem,
							});
						})}
				</DropWrapper>
			</div>
		</div>
	);
}

export default TableCreator;
