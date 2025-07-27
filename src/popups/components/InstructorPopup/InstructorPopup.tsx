"use client";

import React from "react";

import { Instructor } from "utils/types/instructor";
import Api from "api";
import { FormData } from "utils/types/form";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";

type Payload = {
	dataItem?: Instructor;
};

type Props = {
	payload: Payload;
	popupIndex: number;
};

export default function InstructorPopup(props: Props) {
	const { payload = {}, popupIndex } = props;
	const { dataItem } = payload;

	function onSubmit(payload, onSuccess) {
		if (dataItem) {
			Api.cms.instructor.PUT({ payload, config: { onSuccess } });
		} else {
			Api.cms.instructor.POST({ payload, config: { onSuccess } });
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
				label: "שם מדריך",
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},

			{
				name: "phone",
				label: "טלפון",
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString, //todo: add phone check
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
