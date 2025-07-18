"use client";

import React from "react";

import { useAppSelector } from "utils/hooks/useRedux";

import StudentAttendanceView from "components/Cms/StudentAttendanceView/StudentAttendanceView";
import TABLE_CELL_TYPES from "constants/TableCellType";
import Api from "api";

function AttendanceByCourse() {
	const courses = useAppSelector((store) => store.init.courses) ?? [];

	function getData(courseId: string, extraParams: { [key: string]: string }, onSuccess: (data: any) => void) {
		Api.cms.attendanceByCourse.GET({
			payload: { courseId, ...extraParams },
			config: { onSuccess },
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
