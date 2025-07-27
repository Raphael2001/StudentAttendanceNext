import { clsx } from "utils/functions";
import styles from "./StarButton.module.scss";
import Star from "components/General/Svg/Star";
type StarProps = {
	isSelected: boolean;
	onClick?: () => void;
	disabled?: boolean;
};

export default function StarButton(props: StarProps) {
	const { isSelected, onClick = () => {}, disabled = false } = props;

	function onClickHandler(e) {
		e.preventDefault();
		onClick();
	}
	return (
		<button
			className={clsx(styles["star-button"], disabled && styles["disabled"])}
			onClick={onClickHandler}
			disabled={disabled}
		>
			{isSelected ? <Star className={clsx(styles["star"], styles["filled"])} /> : <Star className={clsx(styles["star"], styles["empty"])} />}
		</button>
	);
}
