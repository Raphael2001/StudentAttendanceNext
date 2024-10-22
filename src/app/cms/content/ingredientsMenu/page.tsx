"use client";

import React from "react";

import CMS_MODULES from "constants/CMSModules";
import Api from "api/requests";
import TABLE_CELL_TYPES from "constants/TableCellType";

import { Routes } from "constants/routes";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function ItemIngredientsMenuPage() {
  const ingredientsMenus = useAppSelector(
    (store) => store.init.ingredientsMenus
  );

  const header = {
    name: {
      title: "שם",
      type: TABLE_CELL_TYPES.TEXT,
    },
    minOptions: {
      title: "מינימום",
      type: TABLE_CELL_TYPES.TEXT,
    },
    maxOptions: {
      title: "מקסימום",
      type: TABLE_CELL_TYPES.TEXT,
    },
    ingredients: {
      title: "מספר רכיבים",
      type: TABLE_CELL_TYPES.COUNT_ROWS,
    },
    isFree: {
      title: "תפריט חינמי",
      type: TABLE_CELL_TYPES.COLORED_CELL,
      options: {
        true: {
          color: "orange",
          title: "כן",
          id: true,
        },
        false: {
          color: "blue",
          title: "לא",
          id: false,
        },
      },
    },
  };

  return (
    <PageGenerator
      data={ingredientsMenus}
      deleteApi={Api.deleteIngredientsMenu}
      deleteTitle="למחוק את התפריט הזה?"
      header={header}
      module={CMS_MODULES.INGREDIENTS_MENU}
      baseRoute={Routes.cmsIngredientsMenu}
    />
  );
}

export default ItemIngredientsMenuPage;
