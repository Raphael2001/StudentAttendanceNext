"use client";

import React, { JSX } from "react";

import styles from "./StarRating.module.scss";

import { clsx } from "utils/functions";
import Star from "components/General/Svg/Star";
import StarButton from "components/General/StarButton/StarButton";
type Props = {
	value: number;
	max?: number;
	className?: string;
};

export default function StarRating(props: Props) {
	const { value, max = 5, className = "" } = props;

	function renderStars() {
		const stars: Array<JSX.Element> = [];
		for (let i = 1; i <= max; i++) {
			stars.push(
				<StarButton
					key={i}
					isSelected={value >= i}
					disabled={true}
				/>,
			);
		}
		return stars;
	}

	return <div className={clsx(styles["star-rating"], className)}>{renderStars()}</div>;
}

type StarProps = {
	isSelected: boolean;
};

function StarIcon(props: StarProps) {
	const { isSelected } = props;

	return isSelected ? <Star className={clsx(styles["star"], styles["filled"])} /> : <Star className={clsx(styles["star"], styles["empty"])} />;
}
