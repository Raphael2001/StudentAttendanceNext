"use client";
import React, { useEffect } from "react";

import POPUP_TYPES from "constants/PopupTypes";
import { clsx } from "utils/functions";
import styles from "./popup.module.scss";

// popup components
import ApiErrorPopup from "./components/ApiErrorPopup/ApiErrorPopup";
import TextsPopup from "./components/TextsPopup/TextsPopup";
import TwoActionPopup from "./components/TwoAction";
import MediaPopup from "./components/MediaPopup/MediaPopup";
import EditGeneralInfoPopup from "./components/EditGeneralInfoPopup/EditGeneralInfoPopup";
import GeneralInfoPopup from "./components/GeneralInfoPopup/GeneralInfoPopup";
import LinksPopup from "./components/LinksPopup/LinksPopup";
import IAMRolePopup from "./components/IAMRolePopup/IAMRolePopup";
import CreateUserPopup from "./components/CreateUserPopup/CreateUserPopup";
import TrashPopup from "./components/TrashPopup/TrashPopup";
import UpdateUserPopup from "./components/UpdateUserPopup/UpdateUserPopup";
import { useAppSelector } from "utils/hooks/useRedux";
import FilesPopup from "./components/FilesPopup/FilesPopup";
import SyncDBPopup from "./components/SyncDBPopup/SyncDBPopup";
import { Popup, PopupProps } from "utils/types/popup";
import { lock, clearBodyLocks } from "tua-body-scroll-lock";
import DynamicPagePopup from "./components/DynamicPagePopup/DynamicPagePopup";
import StudentPopup from "./components/StudentsPopup/StudentsPopup";
import TeacherPopup from "./components/TeachersPopup/TeachersPopup";
import InstructorPopup from "./components/InstructorPopup/InstructorPopup";
import UploadExcelFilePopup from "./components/UploadExcelFilePopup/UploadExcelFilePopup";
import CoursePopup from "./components/CoursePopup/CoursePopup";
import LeadSentSuccess from "./components/LeadSentSuccess/LeadSentSuccess";

const popupComponentsMap = {
	[POPUP_TYPES.API_ERROR]: ApiErrorPopup,
	[POPUP_TYPES.TWO_ACTION]: TwoActionPopup,
	[POPUP_TYPES.TEXTS]: TextsPopup,
	[POPUP_TYPES.MEDIA]: MediaPopup,
	[POPUP_TYPES.EDIT_GENERAL_INFO]: EditGeneralInfoPopup,
	[POPUP_TYPES.GENERAL_INFO]: GeneralInfoPopup,
	[POPUP_TYPES.LINKS]: LinksPopup,
	[POPUP_TYPES.IAM_ROLE]: IAMRolePopup,
	[POPUP_TYPES.CREATE_USER]: CreateUserPopup,
	[POPUP_TYPES.TRASH]: TrashPopup,
	[POPUP_TYPES.UPDATE_USER]: UpdateUserPopup,
	[POPUP_TYPES.FILES]: FilesPopup,
	[POPUP_TYPES.SYNC_DB]: SyncDBPopup,
	[POPUP_TYPES.DYNAMIC_PAGES]: DynamicPagePopup,
	[POPUP_TYPES.STUDENT]: StudentPopup,
	[POPUP_TYPES.TEACHER]: TeacherPopup,
	[POPUP_TYPES.INSTRUCTOR]: InstructorPopup,
	[POPUP_TYPES.COURSE]: CoursePopup,
	[POPUP_TYPES.UPLOAD_EXCEL_FILE]: UploadExcelFilePopup,
	[POPUP_TYPES.LEAD_SENT_SUCCESS]: LeadSentSuccess,
};

export default function Popups({ className = "" }) {
	const popupsArray = useAppSelector((store) => store.popupsArray);

	useEffect(() => {
		if (popupsArray.length > 0) {
			const key = popupsArray[0].key;
			const element = document.getElementById("popup-" + key);

			if (element) {
				lock(element);
			}
		} else {
			clearBodyLocks();
		}
		return () => {
			clearBodyLocks();
		};
	}, [popupsArray]);

	// map popup types to popup components
	const getPopupComponent = (type: string, { key, ...props }: PopupProps) => {
		const Component = popupComponentsMap[type] || ApiErrorPopup;
		return (
			<Component
				{...props}
				key={key}
			/>
		);
	};

	const renderPopups = () => {
		return popupsArray.map((popup: Popup, index: number) => {
			const popupType = popup.type;
			const popupPayload: PopupProps = {
				type: popupType,
				key: popup.key,
				payload: popup.payload,
				popupIndex: index,
			};

			const popupComponent = getPopupComponent(popup.type, popupPayload);
			return (
				<div
					id={"popup-" + popup.key}
					className={clsx("priority-" + popup.priority, styles["priority"])}
					key={"popup-" + popup.key + popup.type}
				>
					{popupComponent}
				</div>
			);
		});
	};

	const hasPopups = popupsArray.length > 0;

	return (
		<div
			className={clsx(styles["popup"], hasPopups && styles["active"], className)}
			id="popupContainer"
		>
			{renderPopups()}
		</div>
	);
}
