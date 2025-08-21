import AppWrapper from "components/AppWrapper/AppWrapper";
import CmsLoginWrapper from "components/Cms/CmsLoginWrapper/CmsLoginWrapper";
import ISR from "utils/ISR";

import "ckeditor5/ckeditor5.css";
import { clsx } from "utils/functions";
import styles from "./layout.module.scss";

export default async function MainCMSLayout({ children }) {
	const apiValidationData = await ISR.serverValidation();

	return (
		<AppWrapper
			color="green"
			className={clsx(styles["app-wrapper"], "rtl")}
			apiValidationData={apiValidationData}
		>
			<CmsLoginWrapper color={"green"}>{children}</CmsLoginWrapper>
		</AppWrapper>
	);
}
