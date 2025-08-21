import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Scrollbar.module.scss";
import { clsx } from "utils/functions";
import useResizeObserver from "utils/hooks/useResizeObserver";

type Props = {
	children: React.ReactElement;
	className?: string;
	contentClassName?: string;
};

function Scrollbar({ children, className = "", contentClassName = "" }: Props) {
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);
	const contentContainerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	useResizeObserver(contentRef, measureContent);
	useResizeObserver(contentContainerRef, measureContent);

	const [shouldHideScrollbar, setShouldHideScrollbar] = useState(false);

	useEffect(() => {
		measureContent();
	}, []);

	const handleScrollContent = () => {
		const thumbEle = thumbRef.current;
		const contentEle = contentContainerRef.current;
		if (!thumbEle || !contentEle) {
			return;
		}
		thumbEle.style.top = `${(contentEle.scrollTop * 100) / contentEle.scrollHeight}%`;
	};

	const handleClickTrack = (e: MouseEvent) => {
		const trackEle = trackRef.current;
		const contentEle = contentContainerRef.current;
		if (!trackEle || !contentEle) {
			return;
		}
		const bound = trackEle.getBoundingClientRect();
		const percentage = (e.clientY - bound.top) / bound.height;
		contentEle.scrollTop = percentage * (contentEle.scrollHeight - contentEle.clientHeight);
	};

	function measureContent() {
		const thumbEle = thumbRef.current;
		const contentEle = contentContainerRef.current;
		if (!thumbEle || !contentEle) {
			return;
		}
		const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
		if (scrollRatio < 1) {
			setShouldHideScrollbar(false);
			thumbEle.style.height = `${scrollRatio * 100}%`;
		} else {
			setShouldHideScrollbar(true);
		}
	}

	const handleMouseDown = useCallback((e: MouseEvent) => {
		const ele = thumbRef.current;
		const contentEle = contentContainerRef.current;
		if (!ele || !contentEle) {
			return;
		}
		const startPos = {
			top: contentEle.scrollTop,
			x: e.clientX,
			y: e.clientY,
		};

		const handleMouseMove = (e: MouseEvent) => {
			const dy = e.clientY - startPos.y;
			const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
			contentEle.scrollTop = startPos.top + dy / scrollRatio;
			updateCursor(ele);
		};

		const handleMouseUp = () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
			resetCursor(ele);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	}, []);

	const handleTouchStart = useCallback((e: TouchEvent) => {
		const ele = thumbRef.current;
		const contentEle = contentContainerRef.current;
		if (!ele || !contentEle) {
			return;
		}
		const touch = e.touches[0];
		const startPos = {
			top: contentEle.scrollTop,
			x: touch.clientX,
			y: touch.clientY,
		};

		const handleTouchMove = (e: TouchEvent) => {
			const touch = e.touches[0];
			const dy = touch.clientY - startPos.y;
			const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
			contentEle.scrollTop = startPos.top + dy / scrollRatio;
			updateCursor(ele);
		};

		const handleTouchEnd = () => {
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleTouchEnd);
			resetCursor(ele);
		};

		document.addEventListener("touchmove", handleTouchMove);
		document.addEventListener("touchend", handleTouchEnd);
	}, []);

	const updateCursor = (ele: HTMLDivElement) => {
		ele.style.userSelect = "none";
		document.body.style.userSelect = "none";
	};

	const resetCursor = (ele: HTMLDivElement) => {
		ele.style.userSelect = "";
		document.body.style.userSelect = "";
	};

	return (
		<div className={clsx(styles["wrapper"], className)}>
			<div
				className={clsx(styles["container-content"], contentClassName)}
				ref={contentContainerRef}
				onScroll={handleScrollContent}
			>
				<div ref={contentRef}>{children}</div>
			</div>

			<div className={clsx(styles["scrollbar"], shouldHideScrollbar ? styles["hide"] : "")}>
				<div
					className={styles["scrollbar-track"]}
					ref={trackRef}
					onClick={(e) => handleClickTrack(e.nativeEvent)}
				/>
				<div
					className={styles["scrollbar-thumb"]}
					ref={thumbRef}
					onMouseDown={(e) => handleMouseDown(e.nativeEvent)}
					onTouchStart={(e) => handleTouchStart(e.nativeEvent)}
				/>
			</div>
		</div>
	);
}

export default Scrollbar;
