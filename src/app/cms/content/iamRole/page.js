"use client";

import React from "react";

import POPUP_TYPES from "constants/popup-types";

import TABLE_CELL_TYPES from "constants/TableCellType";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function IAMRolePage(props) {
  const iamRoles = useAppSelector((store) => store.init.iamRoles);

  const header = {
    title: {
      title: "שם תפקיד",
      type: TABLE_CELL_TYPES.TEXT,
    },
  };

  return (
    <PageGenerator
      data={iamRoles}
      header={header}
      module={CMS_MODULES.IAM_ROLE}
      popup={POPUP_TYPES.IAM_ROLE}
      showDeleteAction={false}
    />
  );
}

export default IAMRolePage;
