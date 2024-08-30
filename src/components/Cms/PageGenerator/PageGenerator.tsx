"use client";

import React, { useCallback, useMemo } from "react";

import styles from "./PageGenerator.module.scss";
import useDeleteItem from "utils/hooks/useDeleteItem";
import usePermission from "utils/hooks/usePermission";
import { BaseRoutes } from "constants/routes";
import TABLE_COLORS from "constants/TableColors";
import { TableAction, TableHeader } from "utils/types/table";
import TABLE_CELL_TYPES from "constants/TableCellType";
import CmsButton from "components/CmsButton/CmsButton";
import TableCreator from "components/TableCreator/TableCreator";
import { ApiProps } from "utils/types/api";
import { useRouter } from "next/navigation";
import usePopup from "utils/hooks/usePopup";

type Props = {
  data: Array<any>;
  baseRoute?: string;
  module: string;
  deleteTitle?: string;
  header: TableHeader;
  deleteApi?: (props: ApiProps) => void;
  popup?: string;
  overrideUpdatePopup?: string;
  showDeleteAction?: boolean;
  shoUpdateAction?: boolean;
};

function PageGenerator(props: Props) {
  const {
    data,
    module,
    baseRoute,
    popup,
    deleteTitle = "",
    header,
    deleteApi = () => {},
    overrideUpdatePopup,
    showDeleteAction = true,
    shoUpdateAction = true,
  } = props;
  const openPopup = usePopup();

  usePermission(module);
  const router = useRouter();

  const deleteItem = useDeleteItem();

  function onUpdate(item) {
    if (baseRoute) {
      router.push(`${baseRoute}/${item._id}`);
    }
    if (overrideUpdatePopup) {
      return openPopup(overrideUpdatePopup, { dataItem: item });
    }
    if (popup) {
      openPopup(popup, { dataItem: item });
    }
  }

  function deleteItemHandler(item) {
    deleteItem(deleteTitle, callback);
    function callback(onSuccess) {
      onDelete(item, onSuccess);
    }
  }

  function onDelete(item, onSuccess) {
    const payload = { id: item._id };
    deleteApi({ payload, onSuccess });
  }

  function createNew() {
    if (baseRoute) {
      router.push(baseRoute + BaseRoutes.addNew);
    }
    if (popup) {
      openPopup(popup);
    }
  }

  const updateAction = {
    color: TABLE_COLORS.GREEN,
    text: "עדכון",
    onClick: onUpdate,
  };

  const deleteAction = {
    color: TABLE_COLORS.RED,
    text: "מחיקה",
    onClick: deleteItemHandler,
  };

  const getActions = useCallback(() => {
    const actions: Array<TableAction> = [];
    if (shoUpdateAction) {
      actions.push(updateAction);
    }
    if (showDeleteAction) {
      actions.push(deleteAction);
    }
    return actions;
  }, [showDeleteAction, showDeleteAction]);

  const actions = getActions();

  const tableHeader: TableHeader = {
    ...header,
    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: actions,
    },
  };

  const dataArray = Array.isArray(data) ? data : [];

  return (
    <div className={styles["page-wrapper"]}>
      <div className={styles["add-button-wrapper"]}>
        <CmsButton onClick={createNew} text="הוסף חדש" />
      </div>

      <TableCreator data={dataArray} header={tableHeader} />
    </div>
  );
}

export default PageGenerator;
