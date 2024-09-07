"use client";

import React from "react";

import POPUP_TYPES from "constants/popup-types";

import TABLE_CELL_TYPES from "constants/TableCellType";

import Api from "api/requests";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

export default function InstructorsPage(props) {
  const instructors = useAppSelector((store) => store.init.instructors);

  const header = {
    _id: {
      title: "תעודת זהות",
      type: TABLE_CELL_TYPES.TEXT,
    },
    name: {
      title: "שם",
      type: TABLE_CELL_TYPES.TEXT,
    },

    phone: {
      title: "טלפון",
      type: TABLE_CELL_TYPES.TEXT,
    },
  };
  return (
    <PageGenerator
      data={instructors}
      deleteApi={Api.deleteInstructor}
      deleteTitle="למחוק את המדריך הזה?"
      header={header}
      module={CMS_MODULES.INSTRUCTORS}
      popup={POPUP_TYPES.INSTRUCTOR}
    />
  );
}
