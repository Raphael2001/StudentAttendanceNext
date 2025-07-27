"use client";

import React from "react";

import styles from "./SelectedOptions.module.scss";
import SelectedOption from "components/General/Basic/SelectedOptions/SelectedOption/SelectedOption";
import { clsx } from "utils/functions";
import { GeneralOptionItem } from "utils/types/inputs";

type Props = {
	value: Array<string>;
	options: Array<GeneralOptionItem>;
	field?: string;
	className?: string;
	onClick: (option: GeneralOptionItem) => void;
};

function SelectedOptions(props: Props) {
	const { options = [], value = [], field = "text", className = "", onClick } = props;

	return (
		<div className={clsx(styles["selected-options-wrapper"], className)}>
			{Array.isArray(value) &&
				value.map((item, index) => {
					const option = options.find((opt) => opt._id == item);

					return option ? (
						<SelectedOption
							key={"item-option" + index}
							text={option[field]}
							onClickIcon={() => onClick(option)}
						/>
					) : null;
				})}
		</div>
	);
}

export default SelectedOptions;
