import React from "react";

import styles from "./TextCell.module.scss";
import CopyButton from "components/General/CopyButton/CopyButton";

type Props = {
	value: string;
	showCopy?: boolean;
};

function TextCell(props: Props) {
	const { value, showCopy = false } = props;

	return (
		<div className={styles["text-cell-wrapper"]}>
			{showCopy && <CopyButton value={value} />}

			<div className={styles["text-cell"]}>{value}</div>
		</div>
	);
}

export default TextCell;
