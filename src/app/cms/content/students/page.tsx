"use client";

import React from "react";

import TABLE_CELL_TYPES from "constants/TableCellType";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import POPUP_TYPES from "constants/PopupTypes";
import Api from "api";

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
		schoolName: {
			title: "שם בית ספר",
			type: TABLE_CELL_TYPES.TEXT,
		},
	};
	return (
		<PageGenerator
			data={students}
			deleteApi={Api.cms.teacher.DELETE}
			deleteTitle="למחוק את התלמיד הזה?"
			header={header}
			module={CMS_MODULES.STUDENTS}
			popup={POPUP_TYPES.STUDENT}
			uploadFile
			pagination={false}
		/>
	);
}

export default StudentsPage;
