"use client";

import React from "react";

import styles from "./AutoComplete.module.scss";
import AutoComplete from "components/General/Forms/AutoComplete/AutoComplete";
import { useAppSelector } from "utils/hooks/useRedux";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/PopupTypes";
import FormButton from "components/General/Forms/FormButton/FormButton";
import { AutoCompleteDataProps } from "utils/types/form";
import PlusCircle from "components/General/Svg/PlusCircle";

function LinksAutoComplete(props: AutoCompleteDataProps) {
	const links = useAppSelector((store) => store.init?.links) ?? [];

	const openPopup = usePopup();

	return (
		<div className={styles["auto-complete"]}>
			<AutoComplete
				options={links}
				field="name"
				{...props}
			/>

			<FormButton
				className={styles["plus-icon"]}
				onClick={() => openPopup(POPUP_TYPES.LINKS)}
			>
				<PlusCircle />
			</FormButton>
		</div>
	);
}

export default LinksAutoComplete;
