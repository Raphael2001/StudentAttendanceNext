"use client";

import React, { useEffect, useState } from "react";

import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import Api from "api";

import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";

import useCMSTranslate from "utils/hooks/useCMSTranslate";
import { FormData, Inputs } from "utils/types/form";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";
import { Lesson } from "utils/types/lesson";
import { ApiResponse } from "utils/types/api";
import styles from "./LessonAttendance.module.scss";

type Payload = {
	dataItem?: Lesson;
};

type Props = {
	payload: Payload;
	popupIndex: number;
};

function LessonAttendancePopup(props: Props) {
	const { payload = {}, popupIndex } = props;
	const { dataItem } = payload;

	const [inputs, setInputs] = useState<Inputs>([]);

	const translate = useCMSTranslate();

	useEffect(() => {
		if (dataItem) {
			const courseId = dataItem.courseId;
			const date = dataItem.date;
			const payload = { courseId, date };
			Api.cms.cmsLessonAttendance.GET({ payload, config: { onSuccess } });
			function onSuccess(res: ApiResponse<Lesson>) {
				const rows = res.body.students.map((student) => {
					return [
						{
							name: `${student.studentId}-attending`,
							label: student.name,
							inputType: FORM_INPUTS_TYPES.CHECKBOX,
							schema: VALIDATION_SCHEMES.Boolean,
							initialValue: student.attending,
						},
						{
							name: `${student.studentId}-note`,
							label: translate("attendance_note"),
							inputType: FORM_INPUTS_TYPES.INPUT,
							schema: VALIDATION_SCHEMES.String,
							initialValue: student.note,
						},
					];
				});
				setInputs(rows);
			}
		}
	}, [dataItem]);

	const formData: FormData = {
		inputs,
	};

	function onSubmit(formPayload, onSuccess) {
		if (dataItem) {
			const attendance = {};
			for (const inputName in formPayload) {
				const studentId = inputName.split("-")[0];
				const attendanceKey = inputName.split("-")[1];

				attendance[studentId] = { ...attendance[studentId], [attendanceKey]: formPayload[inputName] };
			}

			const courseId = dataItem.courseId;
			const date = dataItem.date;
			const payload = {
				lessonDate: date,
				lessonId: courseId,
				attendance,
			};

			Api.cms.cmsAttendance.POST({ payload, config: { onSuccess } });
		}
	}

	return (
		<GeneralFormPopup
			hasDataItem={!!dataItem}
			formData={formData}
			onSubmit={onSubmit}
			popupIndex={popupIndex}
			formClassName={styles["lesson-attendance-form"]}
		/>
	);
}

export default LessonAttendancePopup;
