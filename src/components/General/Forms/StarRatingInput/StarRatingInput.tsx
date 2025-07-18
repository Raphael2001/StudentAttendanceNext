"use client";

import React, { JSX } from "react";

import styles from "./StarRatingInput.module.scss";
import { clsx } from "utils/functions";

import BasicInputErrorMsg from "components/General/Basic/BasicInputErrorMsg/BasicInputErrorMsg";
import StarButton from "components/General/StarButton/StarButton";

type Props = {
	value: number;
	onChange: (name: string, value: number) => void;
	id?: string;
	name?: string;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	showError?: boolean;
	errorMessage?: string;
	max?: number;
};

export default function StarRatingInput(props: Props) {
	const { value = 0, max = 5, onChange, name = "", id, className, placeholder, showError = false, errorMessage = "" } = props;

	function onChangeHandler(rating: number) {
		onChange(name, rating);
	}

	function renderStars() {
		const stars: Array<JSX.Element> = [];
		for (let i = 1; i <= max; i++) {
			stars.push(
				<StarButton
					key={i}
					isSelected={value >= i}
					onClick={() => onChangeHandler(i)}
				/>,
			);
		}
		return stars;
	}

	return (
		<div className={clsx(styles["star-rating-wrapper"], className)}>
			<span className={styles["placeholder"]}>{placeholder}</span>
			<div className={styles["stars"]}>{renderStars()}</div>
			<BasicInputErrorMsg
				showError={showError}
				errorMessage={errorMessage}
			/>
		</div>
	);
}
