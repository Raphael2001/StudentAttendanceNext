"use client";

import React, { useRef } from "react";

import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import FormCreator from "components/General/FormCreator/FormCreator";
import { FormData } from "utils/types/form";

import styles from "./GeneralFormPopup.module.scss";
import { FormPayload } from "utils/types/general";
import { clsx } from "utils/functions";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

type Props = {
	hasDataItem: boolean;
	formData: FormData;
	onSubmit: (payload: FormPayload, onSuccess: () => void) => void;
	formClassName?: string;
	className?: string;
	overrideBtnText?: string;
	popupIndex: number;
};

export default function GeneralFormPopup(props: Props) {
	const { hasDataItem = false, formData, onSubmit, formClassName, className, overrideBtnText, popupIndex } = props;

	const ref = useRef<SlidePopupRef>(null);
	const translate = useCMSTranslate();

	function onSuccess() {
		ref.current?.animateOut();
	}

	function onSubmitHandler(payload: FormPayload) {
		onSubmit(payload, onSuccess);
		return true;
	}

	return (
		<SlidePopup
			className={clsx(styles["general-form-popup"], className)}
			ref={ref}
			showCloseIcon
			popupIndex={popupIndex}
		>
			<div className={clsx(styles["form"], formClassName)}>
				<FormCreator
					formData={formData}
					buttonText={overrideBtnText ? overrideBtnText : !hasDataItem ? translate("add_action") : translate("update_action")}
					onSubmit={onSubmitHandler}
				/>
			</div>
		</SlidePopup>
	);
}
