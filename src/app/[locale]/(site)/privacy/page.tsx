"use client";

import React from "react";
import { useAppSelector } from "utils/hooks/useRedux";

import styles from "./privacy.module.scss";
import AppText from "components/App/AppText/AppText";

function Privacy() {
	const texts = useAppSelector((store) => store.initApp.texts);
	return (
		<AppText
			value={texts.privacy_policy}
			className={styles["privacy-text"]}
		/>
	);
}

export default Privacy;
