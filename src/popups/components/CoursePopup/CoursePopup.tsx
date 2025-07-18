"use client";

import React, { useMemo } from "react";

import { useAppSelector } from "utils/hooks/useRedux";

import { Course } from "utils/types/course";

import { convertStringToDate, formatDate } from "utils/functions";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import Api from "api";
import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

type Payload = {
	dataItem?: Course;
};

type Props = {
	payload: Payload;
	popupIndex: number;
};

function CoursePopup(props: Props) {
	const { payload, popupIndex } = props;
	const { dataItem } = payload;

	const instructors = useAppSelector((store) => store.init.instructors);

	function onSubmit(formPayload, onSuccess) {
		const payload = formatPayload(formPayload);
		if (dataItem) {
			Api.cms.course.PUT({ payload, config: { onSuccess } });
		} else {
			Api.cms.course.POST({ payload, config: { onSuccess } });
		}
	}

	function transformInitialData(initialData?: Course) {
		if (initialData) {
			const data = JSON.parse(JSON.stringify(initialData));
			data.endDate = convertStringToDate(initialData.endDate);
			data.startDate = convertStringToDate(initialData.startDate);
			const [hour, minute] = initialData.time.split(":");
			data.time = { hour, minute };
			return data;
		}
		return undefined;
	}

	function formatPayload(formPayload) {
		const payload = { ...formPayload };
		payload.endDate = formatDate(formPayload.endDate);
		payload.startDate = formatDate(formPayload.startDate);
		payload.time = `${formPayload.time.hour}:${formPayload.time.minute}`;
		return payload;
	}

	const initialData = useMemo(() => transformInitialData(dataItem), [dataItem]);

	const formData: FormData = {
		inputs: [
			{
				name: "_id",
				label: "מזהה קורס",
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,

				isDisabled: !!dataItem,
			},
			{
				name: "name",
				label: "שם קורס",
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},
			{
				name: "startDate",
				label: "תאריך התחלה",
				inputType: FORM_INPUTS_TYPES.DATE_PICKER,
				schema: VALIDATION_SCHEMES.RequiredString,
			},
			{
				name: "endDate",
				label: "תאריך סיום",
				inputType: FORM_INPUTS_TYPES.DATE_PICKER,
				schema: VALIDATION_SCHEMES.RequiredString,
			},
			{
				name: "time",
				label: "שעת הקורס",
				inputType: FORM_INPUTS_TYPES.TIME_PICKER,
				schema: VALIDATION_SCHEMES.RequiredString,
			},
			{
				name: "days",
				label: "ימי הקורס",
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},

			{
				name: "instructorId",
				label: "מדריך",
				inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
				schema: VALIDATION_SCHEMES.RequiredString,
				options: instructors,
				field: "name",
			},
		],
		initialData: initialData,
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

export default CoursePopup;
