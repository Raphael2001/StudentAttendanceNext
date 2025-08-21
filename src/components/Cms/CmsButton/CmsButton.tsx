"use client";

import React, { useRef } from "react";

import styles from "./CmsButton.module.scss";
import { clsx } from "utils/functions";
import FormButton from "components/General/Forms/FormButton/FormButton";
import Icon from "components/General/Icon/Icon";
import { IconType } from "utils/types/svg";

type Props = {
	className?: string;
	text: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	isDisabled?: boolean;
	color?: string;
	icon?: IconType;
};

export default function CmsButton(props: Props) {
	const { className = "", onClick, text = "", isDisabled = "", color = "green", icon } = props;

	const spanRef = useRef<HTMLSpanElement>(null);

	const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		createRipple(event);
		setTimeout(() => {
			typeof onClick === "function" && onClick(event);
		}, 400);
	};

	function createRipple(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		const button = event.currentTarget;

		if (spanRef.current) {
			const circle = spanRef.current;

			const diameter = Math.max(button.clientWidth, button.clientHeight);
			const radius = diameter / 2;

			circle.style.width = circle.style.height = `${diameter}px`;
			circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
			circle.style.top = `${event.clientY - button.offsetTop - radius}px`;

			button.appendChild(circle);
		}
	}

	return (
		<FormButton
			className={clsx(styles["button"], isDisabled ? styles["disabled"] : "", "tag", color, className)}
			onClick={onClickHandler}
		>
			<div className={styles["content"]}>
				<Icon
					src={icon}
					className={clsx(styles["icon"], "tag-icon", color)}
				/>
				{text}
			</div>
			<span
				ref={spanRef}
				className={clsx(styles["ripple-creator"], styles["ripple"])}
			></span>
		</FormButton>
	);
}
