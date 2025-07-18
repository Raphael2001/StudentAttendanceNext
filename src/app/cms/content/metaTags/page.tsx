"use client";

import TABLE_CELL_TYPES from "constants/TableCellType";
import POPUP_TYPES from "constants/PopupTypes";
import React from "react";

import Api from "api";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import { Routes } from "constants/routes";

function MetaTags(props) {
  const metaTags = useAppSelector((store) => store.init.metaTags);
  const languages = useAppSelector((store) => store.init?.languages);

  const translate = useCMSTranslate();

  const header = {
    route: {
      title: translate("metaTags_route"),
      type: TABLE_CELL_TYPES.TEXT,
    },
    language: {
      title: translate("metaTags_lang"),
      type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
      dataset: languages,
      displayField: "lang",
      searchField: "langId",
    },
    fields: {
      title: translate("metaTags_tags_num"),
      type: TABLE_CELL_TYPES.COUNT_ROWS,
    },
  };

  return (
    <PageGenerator
      data={metaTags}
      deleteApi={Api.cms.metaTags.DELETE}
      deleteTitle={translate("delete_metaTags")}
      header={header}
      module={CMS_MODULES.META_TAGS}
      baseRoute={Routes.cmsMetaTags}
    />
  );
}

export default MetaTags;
