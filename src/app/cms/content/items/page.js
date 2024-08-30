"use client";

import React from "react";

import CMS_MODULES from "constants/CMSModules";

import TABLE_CELL_TYPES from "constants/TableCellType";

import POPUP_TYPES from "constants/popup-types";
import Api from "api/requests";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function ItemsPage() {
  const items = useAppSelector((store) => store.init.items);
  const media = useAppSelector((store) => store.init.media);

  const { onSuccessNotification } = useNotificationsHandler();

  function onOptionClick(id, item) {
    const payload = {
      moduleName: "Items",
      fieldName: "items",
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

    media: {
      title: "תמונה",
      type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
      dataset: media ? Object.values(media) : [],
      displayField: "name",
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
      data={items}
      deleteApi={Api.deleteItem}
      deleteTitle="למחוק את המוצר הזה?"
      header={header}
      module={CMS_MODULES.ITEMS}
      popup={POPUP_TYPES.ITEMS}
    />
  );
}

export default ItemsPage;
