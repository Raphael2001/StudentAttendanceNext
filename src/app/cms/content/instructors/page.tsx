"use client";

import React from "react";

import TABLE_CELL_TYPES from "constants/TableCellType";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import POPUP_TYPES from "constants/PopupTypes";
import Api from "api";

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
			deleteApi={Api.cms.instructor.DELETE}
			deleteTitle="למחוק את המדריך הזה?"
			header={header}
			module={CMS_MODULES.INSTRUCTORS}
			popup={POPUP_TYPES.INSTRUCTOR}
			uploadFile
			pagination={false}
		/>
	);
}
