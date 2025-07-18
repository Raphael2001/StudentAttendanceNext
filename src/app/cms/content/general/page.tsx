"use client";
import React from "react";

import styles from "./general.module.scss";
import CmsButton from "components/Cms/CmsButton/CmsButton";
import Languages from "components/Cms/Languages/Languages";

import GeneralRow from "components/Cms/GeneralRow/GeneralRow";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/PopupTypes";

import CMS_MODULES from "constants/CMSModules";
import usePermission from "utils/hooks/usePermission";
import { useAppSelector } from "utils/hooks/useRedux";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
export default function GeneralPage() {
	const generalInfo = useAppSelector((store) => store.init.generalInfo);

	const syncOptions = useAppSelector((store) => store.init.syncOptions);

	const hasSyncOptions = syncOptions && Array.isArray(syncOptions) && syncOptions.length > 0;

	const openPopup = usePopup();
	usePermission(CMS_MODULES.GENERAL_INFO);

	const translate = useCMSTranslate();

	console.log("generalInfo", generalInfo);

	return (
		<div className={styles["general-info-wrapper"]}>
			<Languages />

			<CmsButton
				text={translate("add_new_param")}
				className="create"
				onClick={() => openPopup(POPUP_TYPES.GENERAL_INFO)}
			/>

			{generalInfo &&
				Object.values(generalInfo).map((param) => {
					return (
						<GeneralRow
							item={param}
							key={param._id}
						/>
					);
				})}

			{hasSyncOptions && (
				<div className={styles["sync-db-btn"]}>
					<CmsButton
						text={translate("sync_db")}
						className="create"
						onClick={() => openPopup(POPUP_TYPES.SYNC_DB)}
					/>
				</div>
			)}
		</div>
	);
}
