import React from "react";

import styles from "./BasicInputErrorMsg.module.scss";

type Props = {
	showError: boolean;
	errorMessage: string;
};

function BasicInputErrorMsg(props: Props) {
	const { showError, errorMessage = "" } = props;

	return showError ? <span className={styles["error-message"]}>{errorMessage}</span> : null;
}

export default BasicInputErrorMsg;
