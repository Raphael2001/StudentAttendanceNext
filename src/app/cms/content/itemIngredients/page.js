"use client";

import React from "react";

import CMS_MODULES from "constants/CMSModules";
import Api from "api/requests";
import TABLE_CELL_TYPES from "constants/TableCellType";
import POPUP_TYPES from "constants/popup-types";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function ItemIngredientsPage(props) {
  const itemIngredients = useAppSelector((store) => store.init.itemIngredients);

  const { onSuccessNotification } = useNotificationsHandler();

  function onOptionClick(id, item) {
    const payload = {
      moduleName: "ItemIngredients",
      fieldName: "itemIngredients",
      id: id,
      inStock: item.id,
    };
    const config = {
      showLoader: false,
    };
    Api.updateStock({ payload, onSuccess: onSuccessNotification, config });
  }

  const header = {
    name: {
      title: "שם",
      type: TABLE_CELL_TYPES.TEXT,
    },
    price: {
      title: "מחיר",
      type: TABLE_CELL_TYPES.TEXT,
    },
    inStock: {
      title: "מלאי",
      type: TABLE_CELL_TYPES.COLORED_CELL,
      onOptionClick: onOptionClick,
      options: {
        true: {
          color: "green",
          title: "במלאי",
          id: true,
        },
        false: {
          color: "red",
          title: "לא במלאי",
          id: false,
        },
      },
    },
  };

  return (
    <PageGenerator
      data={itemIngredients}
      deleteApi={Api.deleteItemIngredient}
      deleteTitle="למחוק את הרכיב הזה?"
      header={header}
      module={CMS_MODULES.ITEM_INGREDIENTS}
      popup={POPUP_TYPES.ITEM_INGREDIENTS}
    />
  );
}

export default ItemIngredientsPage;
