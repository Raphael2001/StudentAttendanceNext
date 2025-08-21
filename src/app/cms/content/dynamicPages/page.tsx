"use client";

import React from "react";

import useCMSTranslate from "utils/hooks/useCMSTranslate";
import { useAppSelector } from "utils/hooks/useRedux";
import TABLE_CELL_TYPES from "constants/TableCellType";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import Api from "api";
import CMS_MODULES from "constants/CMSModules";
import POPUP_TYPES from "constants/PopupTypes";

import { Routes } from "constants/routes";
import TABLE_COLORS from "constants/TableColors";
import { useRouter } from "next/navigation";
import EditPage from "components/General/Svg/EditPage";

export default function DynamicPages() {
	const dynamicPages = useAppSelector((store) => store.init.dynamicPages);
	const router = useRouter();
	const languages = useAppSelector((store) => store.init.languages);

	const translate = useCMSTranslate();

	const header = {
		name: {
			title: translate("dynamic_page_name"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		route: {
			title: translate("dynamic_page_route"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		language: {
			title: translate("language"),
			type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
			dataset: languages,
			displayField: "lang",
			searchField: "langId",
		},
	};

	const editAction = {
		color: TABLE_COLORS.BLUE,
		icon: EditPage,
		onClick: onEdit,
	};

	function onEdit(item) {
		return router.push(`${Routes.cmsDynamicPage}/${item._id}`);
	}

	const actions = [editAction];

	return (
		<PageGenerator
			data={dynamicPages}
			deleteApi={Api.cms.dynamicPages.DELETE}
			deleteTitle={translate("delete_dynamic_page")}
			header={header}
			module={CMS_MODULES.DYNAMIC_PAGES}
			popup={POPUP_TYPES.DYNAMIC_PAGES}
			extraActions={actions}
		/>
	);
}
