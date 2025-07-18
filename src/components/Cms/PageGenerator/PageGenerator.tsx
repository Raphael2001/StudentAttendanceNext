"use client";

import React, { useCallback, useEffect, useState } from "react";

import styles from "./PageGenerator.module.scss";
import useDeleteItem from "utils/hooks/useDeleteItem";
import usePermission from "utils/hooks/usePermission";
import { BaseRoutes } from "constants/routes";
import TABLE_COLORS from "constants/TableColors";
import { TableAction, TableHeader } from "utils/types/table";
import TABLE_CELL_TYPES from "constants/TableCellType";
import CmsButton from "components/Cms/CmsButton/CmsButton";
import TableCreator from "components/General/TableCreator/TableCreator";
import { ApiProps } from "utils/types/api";
import { useRouter } from "next/navigation";
import usePopup from "utils/hooks/usePopup";
import UpdateSortButton from "components/Cms/UpdateSortButton/UpdateSortButton";
import { InputEvent } from "utils/types/inputs";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import BorderInput from "components/General/Forms/BorderInput/BorderInput";
import Plus from "components/General/Svg/Plus";
import Trash from "components/General/Svg/Trash";
import EditPencil from "components/General/Svg/EditPencil";
import Pagination from "components/General/Pagination/Pagination";
import POPUP_TYPES from "constants/PopupTypes";
type Props = {
	data: Array<any>;
	baseRoute?: string;
	module: string;
	deleteTitle?: string;
	header: TableHeader;
	deleteApi?: (props: ApiProps) => void;
	popup?: string;
	overrideUpdatePopup?: string;
	overrideUpdateRoute?: string;
	showDeleteAction?: boolean;
	showUpdateAction?: boolean;
	enableDrag?: boolean;
	onChangeItems?: (data: Array<Object>) => void;
	searchFields?: Array<string>;
	extraActions?: Array<TableAction>;
	numberOfResults?: number;
	pagination?: boolean;
	uploadFile?: boolean;
	addNew?: boolean;
};

function PageGenerator(props: Props) {
	const {
		data,
		module,
		baseRoute,
		popup,
		deleteTitle = "",
		header,
		deleteApi = () => {},
		overrideUpdatePopup,
		overrideUpdateRoute,
		showDeleteAction = true,
		showUpdateAction = true,
		enableDrag,
		onChangeItems,
		searchFields = [],
		extraActions = [],
		numberOfResults = 5,
		pagination = true,
		uploadFile = false,
		addNew = true,
	} = props;

	const translate = useCMSTranslate();

	const [filterText, setFilterText] = useState("");
	const [filteredData, setFilteredData] = useState(data);
	const [page, setPage] = useState(1);
	const openPopup = usePopup();
	const dataArray: any[] = Array.isArray(data) ? data : [];

	const numberOfPages = numberOfResults ? Math.ceil(dataArray.length / numberOfResults) : 1;

	useEffect(() => {
		if (dataArray && dataArray.length > 0) {
			setFilteredData(dataArray);
		}
	}, [dataArray]);

	usePermission(module);
	const router = useRouter();

	const deleteItem = useDeleteItem();

	function onUpdate(item) {
		if (overrideUpdateRoute) {
			return router.push(`${overrideUpdateRoute}/${item._id}`);
		}

		if (baseRoute) {
			return router.push(`${baseRoute}/${item._id}`);
		}

		if (overrideUpdatePopup) {
			return openPopup(overrideUpdatePopup, { dataItem: item });
		}
		if (popup) {
			openPopup(popup, { dataItem: item });
		}
	}

	function deleteItemHandler(item) {
		deleteItem(deleteTitle, callback);
		function callback(onSuccess) {
			onDelete(item, onSuccess);
		}
	}

	function onDelete(item, onSuccess) {
		const payload = { _id: item._id };
		deleteApi({ payload, config: { onSuccess } });
	}

	function createNew() {
		if (baseRoute) {
			router.push(baseRoute + BaseRoutes.addNew);
		}
		if (popup) {
			openPopup(popup);
		}
	}

	const updateAction = {
		color: TABLE_COLORS.GREEN,
		icon: EditPencil,
		onClick: onUpdate,
	};

	const deleteAction = {
		color: TABLE_COLORS.RED,
		icon: Trash,
		onClick: deleteItemHandler,
	};

	const getActions = useCallback(() => {
		const actions: Array<TableAction> = [...extraActions];
		if (showUpdateAction) {
			actions.push(updateAction);
		}
		if (showDeleteAction) {
			actions.push(deleteAction);
		}
		return actions;
	}, [showDeleteAction, showUpdateAction]);

	const actions = getActions();

	const tableHeader: TableHeader = {
		...header,
		actions: {
			title: translate("actions"),
			type: TABLE_CELL_TYPES.ACTION_BUTTONS,
			actions: actions,
		},
	};

	function onChangeInput(e: InputEvent) {
		const { value } = e.target;
		setFilterText(value);
		filterData(value);
	}

	function filterData(text: string) {
		if (!text) {
			setFilteredData(dataArray); // Reset to full array if search text is empty
			return;
		}

		const lowerCaseText = text.toLowerCase(); // Avoid calling toLowerCase repeatedly

		const filtered = dataArray.filter((item) =>
			searchFields.some((field) => {
				const value = item[field]; // Extract field value
				return field in item && value?.toString().toLowerCase().includes(lowerCaseText);
			}),
		);

		setFilteredData(filtered);
	}

	function getCurrentResults() {
		const start = (page - 1) * numberOfResults;
		const end = start + numberOfResults;
		return filteredData.slice(start, end);
	}

	function onPageChange(page: number) {
		setPage(page);
	}

	function uploadFileButton() {
		openPopup(POPUP_TYPES.UPLOAD_EXCEL_FILE, { moduleName: module });
	}

	const paginatedItems = pagination ? getCurrentResults() : filteredData;
	const showPagination = numberOfPages > 1 && pagination;
	return (
		<div className={styles["page-wrapper"]}>
			<div className={styles["header"]}>
				{uploadFile && (
					<CmsButton
						onClick={uploadFileButton}
						text="העלת קובץ"
					/>
				)}
				{addNew && (
					<CmsButton
						onClick={createNew}
						text={translate("add_new")}
						icon={Plus}
					/>
				)}
			</div>

			{!!(Array.isArray(searchFields) && searchFields.length) && (
				<div className={styles["filter-section"]}>
					<BorderInput
						onChange={onChangeInput}
						placeholder={translate("search")}
						type={"text"}
						value={filterText}
						name="search"
					/>
				</div>
			)}

			<TableCreator
				data={paginatedItems}
				header={tableHeader}
				enableDrag={enableDrag}
				onChangeItems={onChangeItems}
			/>
			{showPagination && (
				<Pagination
					className={styles["pagination"]}
					onPageChange={onPageChange}
					currentPage={page}
					numberOfPages={numberOfPages}
				/>
			)}
			{enableDrag && (
				<UpdateSortButton
					list={dataArray}
					moduleName={module}
					onSuccess={onChangeItems}
				/>
			)}
		</div>
	);
}

export default PageGenerator;
