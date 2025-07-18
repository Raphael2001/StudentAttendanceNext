import { useRef } from "react";
import { clsx } from "utils/functions";
import styles from "./GestureHandler.module.scss";

type Props = {
	ref: React.RefObject<HTMLDivElement | null>;
	onExit: () => void;
	className?: string;
};
export default function GestureHandler({ ref, onExit, className }: Props) {
	const initialY = useRef<number>(null);

	function handleOnTouchStart(e: React.TouchEvent) {
		const clientY = Math.round(e.changedTouches[0].clientY);
		initialY.current = clientY;
	}

	function handleOnTouchRelease(e: React.TouchEvent) {
		const clientY = e.changedTouches[0].clientY;

		if (window.innerHeight - window.innerHeight / 5 <= clientY) {
			onExit();
		} else if (ref.current) {
			ref.current.style.top = `0px`;
		}
	}

	function onTouchMove(e: React.TouchEvent) {
		const clientY = e.changedTouches[0].clientY;
		if (initialY.current !== null && ref.current && clientY > initialY.current) {
			ref.current.style.top = `${Math.abs(initialY.current - clientY)}px`;
		}
	}

	return (
		<div
			className={clsx(styles["gesture-handler"], className)}
			onTouchMove={onTouchMove}
			onTouchEnd={handleOnTouchRelease}
			onTouchStart={handleOnTouchStart}
		/>
	);
}
