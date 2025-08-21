"use client";

import Api from "api";

import React from "react";

import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import TEXT_TAGS from "constants/TextTags";
import { CmsText } from "utils/types/init";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useMultiLangInput from "utils/hooks/useMultiLangInput";
import useMultiLangData from "utils/hooks/useMultiLangData";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

type Props = {
	payload: Payload;
	popupIndex: number;
};

type Payload = {
	dataItem?: CmsText;
};

function TextsPopup(props: Props) {
	const { payload, popupIndex } = props;
	const { dataItem } = payload;

	const translate = useCMSTranslate();

	const { initialData, transformPayload } = useMultiLangData(dataItem);

	const getLangInputs = useMultiLangInput();

	const formData: FormData = {
		inputs: [
			{
				name: "key",
				inputType: FORM_INPUTS_TYPES.INPUT,
				label: translate("text_key"),
				schema: VALIDATION_SCHEMES.RequiredString,
			},
			...getLangInputs("value"),
			{
				name: "tag",
				inputType: FORM_INPUTS_TYPES.SELECT,
				label: translate("text_tag"),
				schema: VALIDATION_SCHEMES.RequiredString,
				options: Object.values(TEXT_TAGS),
				field: "_id",
			},
		],
		initialData: initialData,
	};

	function onSubmit(formPayload, onSuccess) {
		const payload = transformPayload(formPayload);

		if (dataItem) {
			payload["_id"] = dataItem["_id"];
			Api.cms.texts.PUT({ payload, config: { onSuccess } });
		} else {
			Api.cms.texts.POST({ payload, config: { onSuccess } });
		}
	}

	return (
		<GeneralFormPopup
			popupIndex={popupIndex}
			hasDataItem={!!dataItem}
			formData={formData}
			onSubmit={onSubmit}
		/>
	);
}

export default TextsPopup;
