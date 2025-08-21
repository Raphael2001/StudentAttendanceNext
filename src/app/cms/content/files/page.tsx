"use client";

import POPUP_TYPES from "constants/PopupTypes";

import CMS_MODULES from "constants/CMSModules";

import { useAppSelector } from "utils/hooks/useRedux";

import TABLE_CELL_TYPES from "constants/TableCellType";
import { TableHeader } from "utils/types/table";

import Api from "api";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

function FilesPage() {
  const translate = useCMSTranslate();

  const files = useAppSelector((store) => store.init.files);

  const header: TableHeader = {
    name: {
      title: translate("file_name"),
      type: TABLE_CELL_TYPES.TEXT,
    },
  };

  return (
    <PageGenerator
      data={files}
      deleteApi={Api.cms.file.DELETE}
      deleteTitle={translate("delete_file")}
      header={header}
      module={CMS_MODULES.LIBRARY}
      popup={POPUP_TYPES.FILES}
    />
  );
}

export default FilesPage;
