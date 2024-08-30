import React from "react";
import ActionButtonText from "../ActionButtonText/ActionButtonText";
import { TABLE_ACTION_TYPES } from "constants/TableCellType";
import ActionButtonIcon from "../ActionButtonIcon/ActionButtonIcon";
import ActionButtonIconText from "../ActionButtonIconText/ActionButtonIconText";
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
  const hasIcon = !!icon;

  let type = "";

  if (hasText && !hasIcon) {
    type = TABLE_ACTION_TYPES.TEXT;
  } else if (hasIcon && !hasText) {
    type = TABLE_ACTION_TYPES.ICON;
  } else if (hasIcon && hasText) {
    type = TABLE_ACTION_TYPES.ICON_TEXT;
  }

  switch (type) {
    case TABLE_ACTION_TYPES.TEXT:
      return (
        <ActionButtonText text={text} onClick={onClickHandler} color={color} />
      );
    case TABLE_ACTION_TYPES.ICON:
      return <ActionButtonIcon icon={icon} onClick={onClickHandler} />;
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
