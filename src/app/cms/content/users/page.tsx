"use client";

import React from "react";

import POPUP_TYPES from "constants/PopupTypes";

import TABLE_CELL_TYPES from "constants/TableCellType";

import Api from "api";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

function UsersPage() {
  const users = useAppSelector((store) => store.init.users);

  const roles = useAppSelector((store) => store.init.iamRoles);

  const translate = useCMSTranslate();

  const header = {
    username: {
      title: translate("username"),
      type: TABLE_CELL_TYPES.TEXT,
    },
    uuid: {
      title: translate("unique_id"),
      type: TABLE_CELL_TYPES.TEXT,
    },
    roleId: {
      title: translate("user_role"),
      type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
      dataset: roles,
      displayField: "title",
    },
  };
  return (
    <PageGenerator
      data={users}
      deleteApi={Api.cms.cmsUsers.DELETE}
      deleteTitle={translate("delete_user")}
      header={header}
      module={CMS_MODULES.USERS}
      popup={POPUP_TYPES.CREATE_USER}
      overrideUpdatePopup={POPUP_TYPES.UPDATE_USER}
    />
  );
}

export default UsersPage;
