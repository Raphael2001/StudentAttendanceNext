"use client";

import React from "react";

import { useAppSelector } from "utils/hooks/useRedux";

import Api from "api/requests";

import StudentAttendanceView from "components/Cms/StudentAttendanceView/StudentAttendanceView";
import TABLE_CELL_TYPES from "constants/TableCellType";

function AttendanceByCourse() {
  const courses = useAppSelector((store) => store.init.courses) ?? [];

  function getData(courseId: string, onSuccess: (data: any) => void) {
    Api.getAttendanceByCourse({
      payload: { courseId },
      onSuccess,
    });
  }

  const header = {
    teacherName: { title: "שם מורה", type: TABLE_CELL_TYPES.TEXT },
    className: { title: "כיתה", type: TABLE_CELL_TYPES.TEXT },
  };

  return (
    <StudentAttendanceView
      options={courses}
      apiCall={getData}
      extraHeaders={header}
    />
  );
}

export default AttendanceByCourse;
