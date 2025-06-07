"use client";

import React from "react";

import { useAppSelector } from "utils/hooks/useRedux";

import Api from "api/requests";

import StudentAttendanceView from "components/Cms/StudentAttendanceView/StudentAttendanceView";

function AttendanceByTeacher() {
  const teachers = useAppSelector((store) => store.init.teachers) ?? [];

  function getData(
    teacherId: string,
    extraParams: { [key: string]: string },
    onSuccess: (data: any) => void
  ) {
    function onSuccessHandler(data: any) {
      if (data.url) {
        window.open(data.url, "_blank");
      } else {
        onSuccess(data);
      }
    }

    Api.getAttendanceByTeacher({
      payload: { teacherId, ...extraParams },
      onSuccess: onSuccessHandler,
    });
  }

  return (
    <StudentAttendanceView options={teachers} apiCall={getData} dateFilter />
  );
}

export default AttendanceByTeacher;
