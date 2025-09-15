"use client";

import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";
import React from "react";

import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import { FormData } from "utils/types/form";

type Payload = {
	moduleName: string;
};

type Props = {
	payload: Payload;
	popupIndex: number;
};

export default function UploadExcelFilePopup(props: Props) {
	const { payload, popupIndex } = props;
	const { moduleName } = payload;

	const { onSuccessNotification } = useNotificationsHandler();

	function onSubmit(payload, onSuccess) {
		payload.moduleName = moduleName;

		function onSuccessHandler() {
			onSuccessNotification();
			onSuccess();
		}
		Api.cms.excelFile.POST({ payload, config: { onSuccess: onSuccessHandler, isFormData: true } });
	}

	const formData: FormData = {
		inputs: [
			{
				name: "file",
				label: "בחרו קובץ",
				inputType: FORM_INPUTS_TYPES.FILE_UPLOAD,
				schema: VALIDATION_SCHEMES.NoValidation,

				accept: ".xlsx",
			},
		],
	};

	return (
		<GeneralFormPopup
			hasDataItem={false}
			formData={formData}
			onSubmit={onSubmit}
			popupIndex={popupIndex}
		/>
	);
}
