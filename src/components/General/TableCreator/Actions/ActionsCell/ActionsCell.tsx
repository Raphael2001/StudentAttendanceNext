import React from "react";
import { TABLE_ACTION_TYPES } from "constants/TableCellType";
import ActionButtonIcon from "components/General/TableCreator/Actions/ActionButtonIcon/ActionButtonIcon";
import ActionButtonIconText from "components/General/TableCreator/Actions/ActionButtonIconText/ActionButtonIconText";
import { TableAction } from "utils/types/table";

type Props = {
	data: Object;
	actions: Array<TableAction>;
};

function ActionsCell({ actions, data }: Props) {
	return actions.map((action, actionIndex) => {
		return (
			<RenderCell
				action={action}
				key={"action-cell-" + actionIndex}
				data={data}
			/>
		);
	});
}

export default ActionsCell;

type CellProps = {
	action: TableAction;
	data: Object;
};

function RenderCell({ action, data }: CellProps) {
	const { text = "", icon = "", onClick, color = "" } = action;

	function onClickHandler() {
		typeof onClick === "function" && onClick(data);
	}

	const hasText = !!text;

	const type = hasText ? TABLE_ACTION_TYPES.ICON_TEXT : !hasText ? TABLE_ACTION_TYPES.ICON : "";

	switch (type) {
		case TABLE_ACTION_TYPES.ICON:
			return (
				<ActionButtonIcon
					icon={icon}
					onClick={onClickHandler}
					color={color}
				/>
			);
		case TABLE_ACTION_TYPES.ICON_TEXT:
			return (
				<ActionButtonIconText
					icon={icon}
					onClick={onClickHandler}
					text={text}
					color={color}
				/>
			);

		default:
			return null;
	}
}
