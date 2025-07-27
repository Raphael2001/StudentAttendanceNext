"use client";

import React from "react";

import styles from "./DP_Page.module.scss";
import { DynamicPageSectionData } from "utils/types/dynamicPages";

import DP_Section from "components/App/DynamicPages/DynamicPage/Section/DP_Section";

type Props = {
	sections: Array<DynamicPageSectionData>;
};

export default function DP_Page(props: Props) {
	const { sections } = props;

	return (
		<div className={styles["dynamic-page"]}>
			{sections.map((section) => {
				return (
					<DP_Section
						section={section}
						key={section._id + "section"}
					/>
				);
			})}
		</div>
	);
}
