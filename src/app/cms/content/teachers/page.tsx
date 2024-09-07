"use client";

import React from "react";

import POPUP_TYPES from "constants/popup-types";

import TABLE_CELL_TYPES from "constants/TableCellType";

import Api from "api/requests";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function TeachersPage(props) {
  const teachers = useAppSelector((store) => store.init.teachers);

  const header = {
    _id: {
      title: "תעודת זהות",
      type: TABLE_CELL_TYPES.TEXT,
    },
    name: {
      title: "שם",
      type: TABLE_CELL_TYPES.TEXT,
    },
    schoolName: {
      title: "שם בית ספר",
      type: TABLE_CELL_TYPES.TEXT,
    },
    phone: {
      title: "טלפון",
      type: TABLE_CELL_TYPES.TEXT,
    },
    mail: {
      title: "מייל",
      type: TABLE_CELL_TYPES.TEXT,
    },
  };
  return (
    <PageGenerator
      data={teachers}
      deleteApi={Api.deleteTeacher}
      deleteTitle="למחוק את המורה הזה?"
      header={header}
      module={CMS_MODULES.TEACHERS}
      popup={POPUP_TYPES.TEACHER}
    />
  );
}

export default TeachersPage;
