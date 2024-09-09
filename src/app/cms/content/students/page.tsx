"use client";

import React from "react";

import POPUP_TYPES from "constants/popup-types";

import TABLE_CELL_TYPES from "constants/TableCellType";

import Api from "api/requests";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function StudentsPage(props) {
  const students = useAppSelector((store) => store.init.students);

  const header = {
    _id: {
      title: "תעודת זהות",
      type: TABLE_CELL_TYPES.TEXT,
    },
    name: {
      title: "שם",
      type: TABLE_CELL_TYPES.TEXT,
    },
    className: {
      title: "כיתה",
      type: TABLE_CELL_TYPES.TEXT,
    },
  };
  return (
    <PageGenerator
      data={students}
      deleteApi={Api.deleteStudent}
      deleteTitle="למחוק את התלמיד הזה?"
      header={header}
      module={CMS_MODULES.STUDENTS}
      popup={POPUP_TYPES.STUDENT}
      uploadFile
    />
  );
}

export default StudentsPage;
