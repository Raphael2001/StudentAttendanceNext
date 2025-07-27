"use client";
import React from "react";
import Api from "api";

import POPUP_TYPES from "constants/PopupTypes";

import TABLE_CELL_TYPES from "constants/TableCellType";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

export default function TextsPage() {
  const texts = useAppSelector((store) => store.init?.texts);
  const translate = useCMSTranslate();
  const header = {
    key: { title: translate("text_key"), type: TABLE_CELL_TYPES.TEXT },
    tag: { title: translate("text_tag"), type: TABLE_CELL_TYPES.TEXT },
  };

  return (
    <PageGenerator
      data={texts}
      deleteApi={Api.cms.texts.DELETE}
      deleteTitle={translate("delete_text")}
      header={header}
      module={CMS_MODULES.TEXTS}
      popup={POPUP_TYPES.TEXTS}
    />
  );
}
