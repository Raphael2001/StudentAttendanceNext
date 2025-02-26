"use client";

import React from "react";

import { useAppSelector } from "utils/hooks/useRedux";

import Api from "api/requests";

import StudentAttendanceView from "components/Cms/StudentAttendanceView/StudentAttendanceView";

function AttendanceByTeacher() {
  const teachers = useAppSelector((store) => store.init.teachers) ?? [];

  function getData(teacherId: string, onSuccess: (data: any) => void) {
    Api.getAttendanceByTeacher({
      payload: { teacherId },
      onSuccess,
    });
  }

  return <StudentAttendanceView options={teachers} apiCall={getData} />;
}

export default AttendanceByTeacher;
