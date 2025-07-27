"use client";

import React from "react";

import styles from "./SelectedOption.module.scss";

import FormButton from "components/General/Forms/FormButton/FormButton";

type Props = {
	text: string;
	onClickIcon: () => void;
};

function SelectedOption(props: Props) {
	const { text, onClickIcon } = props;

	return (
		<div className={styles["selected-option"]}>
			<FormButton
				className={styles["icon"]}
				onClick={onClickIcon}
			>
				<img
					src={"/assets/icons/close-icon.svg"}
					alt="x"
				/>
			</FormButton>
			<span className={styles["text"]}>{text}</span>
		</div>
	);
}

export default SelectedOption;
