"use client";

import React from "react";

import TABLE_CELL_TYPES from "constants/TableCellType";

import POPUP_TYPES from "constants/PopupTypes";
import Api from "api";

import CMS_MODULES from "constants/CMSModules";

import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

function Links() {
	const links = useAppSelector((store) => store.init.links);

	const translate = useCMSTranslate();

	const header = {
		name: { title: translate("link_name"), type: TABLE_CELL_TYPES.TEXT },
		link: { title: translate("link"), type: TABLE_CELL_TYPES.TEXT },
	};

	return (
		<PageGenerator
			data={links}
			deleteApi={Api.cms.links.DELETE}
			deleteTitle={translate("delete_link")}
			header={header}
			module={CMS_MODULES.LINKS}
			popup={POPUP_TYPES.LINKS}
		/>
	);
}

export default Links;
