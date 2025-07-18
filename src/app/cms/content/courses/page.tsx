"use client";

import React from "react";

import TABLE_CELL_TYPES from "constants/TableCellType";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import { TableHeader } from "utils/types/table";
import TABLE_COLORS from "constants/TableColors";
import { useRouter } from "next/navigation";
import { Routes } from "constants/routes";
import Api from "api";
import { Course } from "utils/types/course";
import POPUP_TYPES from "constants/PopupTypes";

export default function CoursePage(props) {
	const courses = useAppSelector((store) => store.init.courses);
	const instructors = useAppSelector((store) => store.init.instructors);
	const router = useRouter();

	const header: TableHeader = {
		_id: {
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

	const actions = [
		{
			color: TABLE_COLORS.BLUE,
			text: "סימון נוכחות",
			onClick: (course: Course) => {
				router.push(`${Routes.cmsCourse}/${course._id}`);
			},
		},
	];
	return (
		<PageGenerator
			data={courses}
			deleteApi={Api.cms.course.DELETE}
			deleteTitle="למחוק את הקורס הזה?"
			header={header}
			module={CMS_MODULES.COURSES}
			popup={POPUP_TYPES.COURSE}
			uploadFile
			extraActions={actions}
			pagination={false}
		/>
	);
}
