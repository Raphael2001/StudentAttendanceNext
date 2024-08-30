"use client";

import TABLE_CELL_TYPES from "constants/TableCellType";
import POPUP_TYPES from "constants/popup-types";
import React from "react";

import Api from "api/requests";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function MetaTags(props) {
  const metaTags = useAppSelector((store) => store.init.metaTags);
  const languages = useAppSelector((store) => store.init?.languages);

  const header = {
    route: {
      title: "נתיב",
      type: TABLE_CELL_TYPES.TEXT,
    },
    langId: {
      title: "שפה",
      type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
      dataset: languages,
      displayField: "lang",
    },
    fields: {
      title: "מספר תגיות",
      type: TABLE_CELL_TYPES.COUNT_ROWS,
    },
  };

  return (
    <PageGenerator
      data={metaTags}
      deleteApi={Api.deleteMetaTags}
      deleteTitle="למחוק את התגית מטא הזאת?"
      header={header}
      module={CMS_MODULES.META_TAGS}
      popup={POPUP_TYPES.META_TAGS}
    />
  );
}

export default MetaTags;
