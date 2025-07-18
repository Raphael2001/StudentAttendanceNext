"use client";
import React from "react";

import { useAppSelector } from "utils/hooks/useRedux";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import TABLE_CELL_TYPES from "constants/TableCellType";
import { Routes } from "constants/routes";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import Api from "api";
import CMS_MODULES from "constants/CMSModules";

export default function DynamicPageComponents() {
  const pageData = useAppSelector((store) => store.dynamicPage);

  const translate = useCMSTranslate();

  const header = {
    name: {
      title: translate("dynamic_page_name"),
      type: TABLE_CELL_TYPES.TEXT,
    },
    components: {
      title: translate("number_of_sections"),
      type: TABLE_CELL_TYPES.COUNT_ROWS,
    },
  };
  if (pageData._id) {
    const baseRoute = Routes.cmsDynamicPage + "/" + pageData._id;
    return (
      <PageGenerator
        data={pageData.sections}
        deleteApi={Api.cms.dynamicPagesSections.DELETE}
        deleteTitle={translate("delete_dynamic_page_component")}
        header={header}
        module={CMS_MODULES.DYNAMIC_PAGES}
        baseRoute={baseRoute}
      />
    );
  }
}
