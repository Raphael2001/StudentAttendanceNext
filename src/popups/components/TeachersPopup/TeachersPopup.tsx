"use client";

import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";
import React from "react";
import { FormData } from "utils/types/form";

import { Teacher } from "utils/types/teacher";

type Payload = {
	dataItem?: Teacher;
};

type Props = {
	payload: Payload;
	popupIndex: number;
};

export default function TeacherPopup(props: Props) {
	const { payload = {}, popupIndex } = props;
	const { dataItem } = payload;

	function onSubmit(payload, onSuccess) {
		if (dataItem) {
			Api.cms.teacher.PUT({ payload, config: { onSuccess } });
		} else {
			Api.cms.teacher.POST({ payload, config: { onSuccess } });
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
				label: "שם מורה",
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},
			{
				name: "schoolName",
				label: "שם ביה״ס",
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},

			{
				name: "phone",
				label: "טלפון",
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString, //todo: add phone check
			},
			{
				name: "mail",
				label: "מייל",
				inputType: FORM_INPUTS_TYPES.INPUT,

				schema: VALIDATION_SCHEMES.Email,
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
