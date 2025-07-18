"use client";
import React, { useRef } from "react";

import styles from "./Collapse.module.scss";
type Props = {
	open?: boolean;
	children: React.ReactNode;
};

function Collapse(props: Props) {
	const contentRef = useRef<HTMLDivElement>(null);

	const { open = false, children } = props;

	const style: React.CSSProperties = {};
	if (open && contentRef.current) {
		const height = contentRef.current.clientHeight;
		style.height = height;
	}
	return (
		<div
			className={styles["collapse-wrapper"]}
			style={style}
		>
			<div
				className={styles["collapse-content"]}
				ref={contentRef}
			>
				{children}
			</div>
		</div>
	);
}

export default Collapse;
