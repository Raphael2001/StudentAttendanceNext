"use client";

import React from "react";

import POPUP_TYPES from "constants/PopupTypes";

import TABLE_CELL_TYPES from "constants/TableCellType";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

function IAMRolePage() {
  const iamRoles = useAppSelector((store) => store.init.iamRoles);
  const translate = useCMSTranslate();

  const header = {
    title: {
      title: translate("role_name"),
      type: TABLE_CELL_TYPES.TEXT,
    },
  };

  return (
    <PageGenerator
      data={iamRoles}
      header={header}
      module={CMS_MODULES.USERS}
      popup={POPUP_TYPES.IAM_ROLE}
      showDeleteAction={false}
    />
  );
}

export default IAMRolePage;
