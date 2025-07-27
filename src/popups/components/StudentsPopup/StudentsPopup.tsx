"use client";

import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";
import React from "react";

import { useAppSelector } from "utils/hooks/useRedux";
import { FormData } from "utils/types/form";
import { Student } from "utils/types/student";

type Payload = {
	dataItem?: Student;
};

type Props = {
	payload: Payload;
	popupIndex: number;
};

function StudentPopup(props: Props) {
	const { payload = {}, popupIndex } = props;
	const { dataItem } = payload;

	const teachers = useAppSelector((store) => store.init.teachers);

	function onSubmit(payload, onSuccess) {
		if (dataItem) {
			Api.cms.student.PUT({ payload, config: { onSuccess } });
		} else {
			Api.cms.student.POST({ payload, config: { onSuccess } });
		}
	}

	const formData: FormData = {
		inputs: [
			{
				name: "_id",
				label: "תעודת זהות",
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
				isDisabled: !!dataItem,
			},
			{
				name: "name",
				label: "שם תלמיד",
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},
			{
				name: "className",
				label: "שם כיתה",
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},
			{
				name: "schoolName",
				label: "שם בית ספר",
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},

			{
				name: "teacherId",
				label: "מורה",
				inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
				schema: VALIDATION_SCHEMES.RequiredString,
				options: teachers,
				field: "name",
			},
		],
		initialData: dataItem,
	};

	return (
		<GeneralFormPopup
			hasDataItem={!!dataItem}
			formData={formData}
			onSubmit={onSubmit}
			popupIndex={popupIndex}
		/>
	);
}

export default StudentPopup;
