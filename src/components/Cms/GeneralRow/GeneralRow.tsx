"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import GeneralInfoInput from "../GeneralInfoInput/GeneralInfoInput";

import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/PopupTypes";
import TableCreator from "components/General/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";

import styles from "./GeneralRow.module.scss";

import GeneralInfoInputTypes from "constants/GeneralInfoInputTypes";
import { useAppSelector } from "utils/hooks/useRedux";

import { copy } from "utils/functions";
import { GeneralInfo, GeneralInfoValue } from "utils/types/init";
import useDeleteItem from "utils/hooks/useDeleteItem";
import Api from "api";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import Icon from "components/General/Icon/Icon";
import Trash from "components/General/Svg/Trash";
import EditPencil from "components/General/Svg/EditPencil";
import TABLE_COLORS from "constants/TableColors";

type Props = {
	item: GeneralInfo;
};

function GeneralRow(props: Props) {
	const { item } = props;
	const { cmsTitle, _id } = item;

	const openPopup = usePopup();
	const deleteItem = useDeleteItem();
	const translate = useCMSTranslate();

	function deleteItemHandler() {
		deleteItem(translate("delete_param"), callback);
		function callback(onSuccess) {
			const payload = { _id };
			Api.cms.generalInfo.DELETE({ payload, config: { onSuccess } });
		}
	}

	return (
		<div className={styles["general-row-wrapper"]}>
			<div className={styles["title-wrapper"]}>
				<h3 className={styles["general-info-title"]}>{cmsTitle}</h3>
				<button
					className={styles["icon-wrapper"]}
					onClick={() => openPopup(POPUP_TYPES.EDIT_GENERAL_INFO, { dataItem: item })}
				>
					<Icon
						src={EditPencil}
						className={"tag-icon green"}
					/>
				</button>
				<button
					className={styles["icon-wrapper"]}
					onClick={deleteItemHandler}
				>
					<Icon
						src={Trash}
						className={"tag-icon red"}
					/>
				</button>
			</div>
			<RenderInputs item={item} />
		</div>
	);
}

export default GeneralRow;

type inputsProps = {
	item: GeneralInfo;
};

function RenderInputs(props: inputsProps) {
	const { item } = props;
	const { value, inputType } = item;
	const media = useAppSelector((store) => store.init.media);
	const links = useAppSelector((store) => store.init.links);
	const files = useAppSelector((store) => store.init.files);
	const translate = useCMSTranslate();

	const { onSuccessNotification } = useNotificationsHandler();

	const latestValue = useRef<GeneralInfoValue>(value);

	useEffect(() => {
		latestValue.current = value;
	}, [value]);

	const deleteAction = {
		icon: Trash,
		color: TABLE_COLORS.RED,
		onClick: (current: GeneralInfo) => onDelete(current),
	};

	const formatHeader = useCallback(() => {
		switch (inputType) {
			case GeneralInfoInputTypes.MEDIA._id:
				return {
					data: {
						title: translate("param_name"),
						type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
						dataset: media,
						displayField: "name",
					},
				};
			case GeneralInfoInputTypes.FILE._id:
				return {
					data: {
						title: translate("param_name"),
						type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
						dataset: files,
						displayField: "name",
					},
				};

			case GeneralInfoInputTypes.LINK._id:
				return {
					data: {
						title: translate("param_name"),
						type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
						dataset: links,
						displayField: "name",
					},
				};

			case GeneralInfoInputTypes.TEXT._id:
			default:
				return {
					data: {
						title: translate("param_content"),
						type: TABLE_CELL_TYPES.TEXT,
					},
				};
		}
	}, [inputType, media, links]);

	const tableData = copy(value);

	const [tableHeader, setTableHeader] = useState({
		actions: {
			title: translate("actions"),
			type: TABLE_CELL_TYPES.ACTION_BUTTONS,
			actions: [deleteAction],
		},
	});

	useEffect(() => {
		if (Array.isArray(latestValue.current)) {
			const header = formatHeader();
			setTableHeader((prevState) => {
				return { ...header, ...prevState };
			});
		}
	}, [formatHeader, latestValue.current]);

	function removeById(id: string) {
		if (Array.isArray(latestValue.current)) {
			return latestValue.current.filter((i) => i._id !== id);
		}
		return latestValue.current;
	}

	function onDelete(current: GeneralInfo) {
		const newValue = removeById(current._id);
		Api.cms.generalInfo.PUT({
			payload: { _id: item._id, value: newValue },
			config: { onSuccess: onSuccessNotification },
		});
	}

	return (
		<div className={styles["inputs"]}>
			<GeneralInfoInput item={item} />
			{Array.isArray(latestValue.current) && (
				<TableCreator
					header={tableHeader}
					data={tableData}
				/>
			)}
		</div>
	);
}
