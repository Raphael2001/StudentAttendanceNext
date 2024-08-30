"use client";
import React from "react";
import Api from "api/requests";

import POPUP_TYPES from "constants/popup-types";

import TABLE_CELL_TYPES from "constants/TableCellType";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

export default function TextsPage(props) {
  const texts = useAppSelector((store) => store.init?.texts);

  const header = {
    key: { title: "מפתח", type: TABLE_CELL_TYPES.TEXT },
    tag: { title: "תגית", type: TABLE_CELL_TYPES.TEXT },
  };

  return (
    <PageGenerator
      data={texts}
      deleteApi={Api.deleteText}
      deleteTitle="למחוק את הטקסט הזה?"
      header={header}
      module={CMS_MODULES.TEXTS}
      popup={POPUP_TYPES.TEXTS}
    />
  );
}
