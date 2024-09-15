"use client";

import React from "react";

import POPUP_TYPES from "constants/popup-types";

import TABLE_CELL_TYPES from "constants/TableCellType";

import Api from "api/requests";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import { TableHeader } from "utils/types/table";

export default function CoursePage(props) {
  const courses = useAppSelector((store) => store.init.courses);
  const instructors = useAppSelector((store) => store.init.instructors);

  const header: TableHeader = {
    courseId: {
      title: "מזהה קורס",
      type: TABLE_CELL_TYPES.TEXT,
    },
    name: {
      title: "שם",
      type: TABLE_CELL_TYPES.TEXT,
    },
    days: {
      title: "ימי הקורס",
      type: TABLE_CELL_TYPES.TEXT,
    },
    instructorId: {
      title: "מדריך",
      type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
      dataset: instructors,
      displayField: "name",
    },
  };
  return (
    <PageGenerator
      data={courses}
      deleteApi={Api.deleteCourse}
      deleteTitle="למחוק את הקורס הזה?"
      header={header}
      module={CMS_MODULES.COURSES}
      popup={POPUP_TYPES.COURSE}
      uploadFile
    />
  );
}
