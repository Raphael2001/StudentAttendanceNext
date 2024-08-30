"use client";

import React from "react";

import TABLE_CELL_TYPES from "constants/TableCellType";

import POPUP_TYPES from "constants/popup-types";
import Api from "api/requests";

import CMS_MODULES from "constants/CMSModules";

import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function Links() {
  const links = useAppSelector((store) => store.init.links);

  const header = {
    name: { title: "שם", type: TABLE_CELL_TYPES.TEXT },
    link: { title: "לינק", type: TABLE_CELL_TYPES.TEXT },
  };

  return (
    <PageGenerator
      data={links}
      deleteApi={Api.removeLink}
      deleteTitle="למחוק את הלינק הזה?"
      header={header}
      module={CMS_MODULES.LINKS}
      popup={POPUP_TYPES.LINKS}
    />
  );
}

export default Links;
