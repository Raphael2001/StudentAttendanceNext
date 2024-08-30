"use client";

import React from "react";

import styles from "./itemsMenu.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import TableCreator from "components/TableCreator/TableCreator";
import CMS_MODULES from "constants/CMSModules";
import TABLE_COLORS from "constants/TableColors";
import TABLE_CELL_TYPES from "constants/TableCellType";
import usePermission from "utils/hooks/usePermission";
import usePopup from "utils/hooks/usePopup";
import useDeleteItem from "utils/hooks/useDeleteItem";
import POPUP_TYPES from "constants/popup-types";
import Api from "api/requests";

import UpdateSortButton from "components/UpdateSortButton/UpdateSortButton";
import { useAppDispatch, useAppSelector } from "utils/hooks/useRedux";
import { setItemsMenu } from "redux-store/features/initSlice";

function ItemsMenuPage() {
  const itemsMenu = useAppSelector((store) => store.init.itemsMenu);
  usePermission(CMS_MODULES.ITEMS_MENU);
  const dispatch = useAppDispatch();

  const openPopup = usePopup();

  const deleteItem = useDeleteItem();

  function onUpdate(item) {
    openPopup(POPUP_TYPES.ITEMS_MENU, { menu: item });
  }

  function deleteItemHandler(item) {
    deleteItem("למחוק את התפריט הזה?", callback);
    function callback(onSuccess) {
      onDelete(item, onSuccess);
    }
  }

  function onDelete(item, onSuccess) {
    const payload = { id: item._id };
    Api.deleteItemsMenu({ payload, onSuccess });
  }

  function onChangeItems(data) {
    dispatch(setItemsMenu(data));
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

  const header = {
    name: {
      title: "שם",
      type: TABLE_CELL_TYPES.TEXT,
    },
    menuId: {
      title: "מזהה לתפריט",
      type: TABLE_CELL_TYPES.TEXT,
    },
    items: {
      title: "מספר מוצרים",
      type: TABLE_CELL_TYPES.COUNT_ROWS,
    },

    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [updateAction, deleteAction],
    },
  };

  return (
    <div className={styles["items-page-wrapper"]}>
      <div className={styles["add-button-wrapper"]}>
        <CmsButton
          onClick={() => openPopup(POPUP_TYPES.ITEMS_MENU)}
          text="יצירת תפריט חדש"
        />
      </div>

      <TableCreator
        data={itemsMenu ?? []}
        header={header}
        enableDrag={true}
        onChangeItems={onChangeItems}
      />
      <UpdateSortButton
        list={itemsMenu}
        moduleName={CMS_MODULES.ITEMS_MENU}
        onSuccess={onChangeItems}
      />
    </div>
  );
}

export default ItemsMenuPage;
