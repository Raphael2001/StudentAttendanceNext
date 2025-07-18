"use client";

import TABLE_CELL_TYPES from "constants/TableCellType";
import React, { useEffect, useState } from "react";
import { TableHeader } from "utils/types/table";
import PageGenerator from "../PageGenerator/PageGenerator";
import CMS_MODULES from "constants/CMSModules";
import Api from "api";
import { ApiResponse } from "utils/types/api";

type Props = {
	courseId: string;
};

export default function CourseLessons(props: Props) {
	const { courseId } = props;

	const [lessons, setLessons] = useState([]);
	useEffect(() => {
		if (courseId) {
			const payload = { course_id: courseId };
			Api.cms.lessonsByCourse.GET({ payload, config: { onSuccess } });

			function onSuccess(res: ApiResponse) {
				const lessons = res.body.lessons;
				const mappedLessons = lessons.map((lesson) => {
					return {
						...lesson,
						_id: lesson.randomKey,
					};
				});
				setLessons(mappedLessons);
			}
		}
	}, [courseId]);

	const header: TableHeader = {
		name: {
			title: "שם",
			type: TABLE_CELL_TYPES.TEXT,
		},
		date: {
			title: "תאריך ושעה",
			type: TABLE_CELL_TYPES.TEXT,
		},
	};

	return (
		<PageGenerator
			data={lessons}
			showDeleteAction={false}
			header={header}
			module={CMS_MODULES.COURSES}
			addNew={false}
			pagination={false}
		/>
	);
}
