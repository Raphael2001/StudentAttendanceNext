import React from "react";
import styles from "./DP_Section.module.scss";
import { DynamicPageSectionData } from "utils/types/dynamicPages";
import DP_Component from "components/App/DynamicPages/DynamicPage/Component/DP_Component";
import DYNAMIC_PAGE_COMPONENTS_ID from "constants/DynamicPageComponentsId";

type Props = {
	section: DynamicPageSectionData;
};

export default function DP_Section({ section }: Props) {
	const { components } = section;

	function getSection() {
		const rows: React.JSX.Element[] = [];
		let i = 0;

		while (i < components.length) {
			const dpComponent = components[i];
			const jsx = (
				<DP_Component
					component={dpComponent}
					key={dpComponent._id + "-component"}
				/>
			);
			const keyPrefix = `${section._id}-${i}`;

			if (dpComponent.type === DYNAMIC_PAGE_COMPONENTS_ID.MEDIA_CAROUSEL) {
				rows.push(
					<div
						className={styles["row"]}
						key={keyPrefix + "-carousel"}
					>
						<div className={styles["carousel"]}>{jsx}</div>
					</div>,
				);
				i += 1;
				continue;
			}

			if (dpComponent.type === DYNAMIC_PAGE_COMPONENTS_ID.MEDIA_SLIDER) {
				rows.push(
					<div
						className={styles["row"]}
						key={keyPrefix + "-slider"}
					>
						<div className={styles["slider"]}>{jsx}</div>
					</div>,
				);
				i += 1;
				continue;
			}

			if (dpComponent.type === DYNAMIC_PAGE_COMPONENTS_ID.RATING) {
				rows.push(
					<div
						className={styles["row"]}
						key={keyPrefix + "-rating"}
					>
						<div className={styles["rating"]}>{jsx}</div>
					</div>,
				);
				i += 1;
				continue;
			}

			if (dpComponent.type === DYNAMIC_PAGE_COMPONENTS_ID.EDITOR) {
				const next = components[i + 1];
				if (next?.type === DYNAMIC_PAGE_COMPONENTS_ID.MEDIA) {
					const mediaJSX = (
						<DP_Component
							component={next}
							key={next._id + "-component"}
						/>
					);
					rows.push(
						<div
							className={styles["row"]}
							key={keyPrefix + "-text-media"}
						>
							<div className={styles["col"]}>
								<Text>{jsx}</Text>
							</div>
							<div className={styles["col"]}>
								<Media>{mediaJSX}</Media>
							</div>
						</div>,
					);
					i += 2;
					continue;
				}

				// No media to pair with
				rows.push(
					<div
						className={styles["row"]}
						key={keyPrefix + "-text"}
					>
						<div className={styles["col"]}>
							<Text>{jsx}</Text>
						</div>
					</div>,
				);
				i += 1;
				continue;
			}

			if (dpComponent.type === DYNAMIC_PAGE_COMPONENTS_ID.MEDIA) {
				const next = components[i + 1];
				if (next?.type === DYNAMIC_PAGE_COMPONENTS_ID.EDITOR) {
					const textJSX = (
						<DP_Component
							component={next}
							key={next._id + "-component"}
						/>
					);
					rows.push(
						<div
							className={styles["row"]}
							key={keyPrefix + "-media-text"}
						>
							<div className={styles["col"]}>
								<Media>{jsx}</Media>
							</div>
							<div className={styles["col"]}>
								<Text>{textJSX}</Text>
							</div>
						</div>,
					);
					i += 2;
					continue;
				}

				// No text after, show media in row alone
				rows.push(
					<div
						className={styles["row"]}
						key={keyPrefix + "-media"}
					>
						<div className={styles["col"]}>
							<Media>{jsx}</Media>
						</div>
					</div>,
				);
				i += 1;
				continue;
			}

			i += 1; // fallback
		}

		return <section className={styles["dynamic-page-section"]}>{rows}</section>;
	}

	return getSection();
}

function Text({ children }: { children: React.ReactNode }) {
	return <div className={styles["html-text"]}>{children}</div>;
}

function Media({ children }: { children: React.ReactNode }) {
	return <div className={styles["media"]}>{children}</div>;
}
