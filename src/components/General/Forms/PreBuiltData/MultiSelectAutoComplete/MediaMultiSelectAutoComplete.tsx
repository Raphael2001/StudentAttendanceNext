"use client";

import React from "react";

import styles from "./MultiSelectAutoComplete.module.scss";
import { useAppSelector } from "utils/hooks/useRedux";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/PopupTypes";
import FormButton from "components/General/Forms/FormButton/FormButton";
import { MultiSelectAutoCompleteDataProps } from "utils/types/form";
import MultiSelectAutoComplete from "components/General/Forms/MultiSelectAutoComplete/MultiSelectAutoComplete";
import PlusCircle from "components/General/Svg/PlusCircle";

function MediaMultiSelectAutoComplete(props: MultiSelectAutoCompleteDataProps) {
	const media = useAppSelector((store) => store.init.media);

	const openPopup = usePopup();

	return (
		<div className={styles["multi-auto-complete"]}>
			<MultiSelectAutoComplete
				options={media}
				field="name"
				{...props}
			/>

			<FormButton
				className={styles["plus-icon"]}
				onClick={() => openPopup(POPUP_TYPES.MEDIA)}
			>
				<PlusCircle />
			</FormButton>
		</div>
	);
}

export default MediaMultiSelectAutoComplete;
