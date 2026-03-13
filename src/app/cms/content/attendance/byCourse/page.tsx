"use client";

import React, { useMemo } from "react";

import { useAppSelector } from "utils/hooks/useRedux";

import StudentAttendanceView from "components/Cms/StudentAttendanceView/StudentAttendanceView";
import TABLE_CELL_TYPES from "constants/TableCellType";
import Api from "api";
import SEMESTERS from "constants/Semesters";

function AttendanceByCourse() {
	const courses = useAppSelector((store) => store.init.courses);

	const options = useMemo(() => {
		const coursesList = courses ?? [];
		return coursesList.map((course) => {
			const semester = SEMESTERS.find((s) => s._id === String(course.semester))?.name ?? "";
			return {
				...course,
				name: `${course.name}${semester ? ` (${semester})` : ""}`,
			};
		});
	}, [courses]);

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
			options={options}
			apiCall={getData}
			extraHeaders={header}
		/>
	);
}

export default AttendanceByCourse;
