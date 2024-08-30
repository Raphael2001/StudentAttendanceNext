"use client";

import React from "react";

import POPUP_TYPES from "constants/popup-types";

import TABLE_CELL_TYPES from "constants/TableCellType";

import Api from "api/requests";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function UsersPage(props) {
  const users = useAppSelector((store) => store.init.users);

  const roles = useAppSelector((store) => store.init.iamRoles);

  const header = {
    username: {
      title: "שם משתמש",
      type: TABLE_CELL_TYPES.TEXT,
    },
    uuid: {
      title: "מזהה יחודי",
      type: TABLE_CELL_TYPES.TEXT,
    },
    roleId: {
      title: "תפקיד",
      type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
      dataset: roles,
      displayField: "title",
    },
  };
  return (
    <PageGenerator
      data={users}
      deleteApi={Api.deleteUser}
      deleteTitle="למחוק את היוזר הזה?"
      header={header}
      module={CMS_MODULES.USERS}
      popup={POPUP_TYPES.CREATE_USER}
      overrideUpdatePopup={POPUP_TYPES.UPDATE_USER}
    />
  );
}

export default UsersPage;
