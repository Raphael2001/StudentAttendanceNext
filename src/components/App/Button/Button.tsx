"use client";

import styles from "./Button.module.scss";
import { ButtonSize, ButtonColor, ButtonShape, ButtonVariant } from "utils/types/button";
import { BUTTON_SHAPE, BUTTON_SIZE, BUTTON_VARIANT } from "constants/ButtonTypes";
import { clsx } from "utils/functions";
import { IconType } from "utils/types/svg";
import Icon from "components/General/Icon/Icon";

type basicButtonProps = {
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	shape?: ButtonShape;
	shadow?: boolean;
	color?: ButtonColor;
	variant?: ButtonVariant;
	isLoading?: boolean;
	size?: ButtonSize;
	link?: string;

	className?: string;
};

type Props = {
	leadingIcon?: IconType;
	trailingIcon?: IconType;
	text: string;
};

export function Button(props: Props & basicButtonProps) {
	const {
		size = BUTTON_SIZE.MEDIUM,
		variant = BUTTON_VARIANT.PRIMARY,
		disabled = false,
		shape = BUTTON_SHAPE.ROUNDED,
		leadingIcon,
		trailingIcon,
		text,
		onClick,
		color = "default",
		shadow = false,
		isLoading = false,
		link,
		className = "",
	} = props;

	const sizeClass = styles[size];
	const variantClass = styles[variant];
	const disabledClass = disabled || isLoading ? styles["disabled"] : "";
	const shapeClass = styles[shape];
	const colorClass = styles[color];
	const shadowClass = shadow ? styles["shadow"] : "";

	const classes = clsx(
		styles["basic-button"],
		styles["button"],
		sizeClass,
		variantClass,
		shapeClass,
		colorClass,
		shadowClass,
		disabledClass,
		isLoading ? styles["loading"] : "",

		className,
	);

	if (link) {
		return (
			<a
				href={link}
				className={classes}
			>
				<ButtonLoader loading={isLoading} />
				<Icon
					src={leadingIcon}
					className={styles["icon"]}
				/>
				<span className={styles["text"]}>{text}</span>
				<Icon
					src={trailingIcon}
					className={styles["icon"]}
				/>
			</a>
		);
	}

	return (
		<button
			onClick={onClick}
			className={classes}
		>
			<ButtonLoader loading={isLoading} />

			<Icon
				src={leadingIcon}
				className={styles["icon"]}
			/>
			<span className={styles["text"]}>{text}</span>
			<Icon
				src={trailingIcon}
				className={styles["icon"]}
			/>
		</button>
	);
}

type IconOnlyProps = {
	icon: IconType;
};

export function IconButton(props: IconOnlyProps & basicButtonProps) {
	const {
		size = BUTTON_SIZE.MEDIUM,
		variant = BUTTON_VARIANT.PRIMARY,
		disabled = false,
		shape = BUTTON_SHAPE.ROUNDED,
		onClick,
		color = "success",
		shadow = true,
		isLoading = false,
		icon,
		link,

		className = "",
	} = props;

	const sizeClass = styles[size];
	const variantClass = styles[variant];
	const disabledClass = disabled || isLoading ? styles["disabled"] : "";
	const shapeClass = styles[shape];
	const colorClass = styles[color];
	const shadowClass = shadow ? styles["shadow"] : "";

	const classes = clsx(
		styles["basic-button"],
		styles["icon-button"],
		sizeClass,
		variantClass,
		shapeClass,
		colorClass,
		shadowClass,
		disabledClass,
		isLoading ? styles["loading"] : "",
		className,
	);

	if (link) {
		return (
			<a
				href={link}
				className={classes}
			>
				<ButtonLoader loading={isLoading} />
				<Icon
					src={icon}
					className={styles["icon"]}
				/>
			</a>
		);
	}

	return (
		<button
			onClick={onClick}
			className={classes}
		>
			<ButtonLoader loading={isLoading} />
			<Icon
				src={icon}
				className={styles["icon"]}
			/>
		</button>
	);
}

function ButtonLoader({ loading = false }) {
	if (!loading) {
		return null;
	}
	return <span className={clsx(styles["loader"])} />;
}
