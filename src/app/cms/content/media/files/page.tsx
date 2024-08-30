"use client";
import CmsButton from "components/CmsButton/CmsButton";
import styles from "./files.module.scss";
import POPUP_TYPES from "constants/popup-types";
import usePopup from "utils/hooks/usePopup";
import CMS_MODULES from "constants/CMSModules";
import usePermission from "utils/hooks/usePermission";
import { useAppSelector } from "utils/hooks/useRedux";
import TableCreator from "components/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import { TableHeader } from "utils/types/table";
import TABLE_COLORS from "constants/TableColors";
import useDeleteItem from "utils/hooks/useDeleteItem";
import Api from "api/requests";

type Props = {};

function FilesPage(props: Props) {
  const openPopup = usePopup();
  usePermission(CMS_MODULES.MEDIA);
  const deleteItem = useDeleteItem();

  const files = useAppSelector((store) => store.init.files);

  const filesArray = Object.values(files);

  function createNewFile() {
    openPopup(POPUP_TYPES.FILES);
  }

  function deleteItemHandler(item) {
    deleteItem("למחוק את הקובץ הזה?", callback);
    function callback(onSuccess) {
      onDelete(item, onSuccess);
    }
  }

  function onDelete(item, onSuccess) {
    const payload = { id: item._id };
    Api.removeFile({ payload, onSuccess });
  }

  const deleteAction = {
    color: TABLE_COLORS.RED,
    text: "מחיקה",
    onClick: deleteItemHandler,
  };

  const header: TableHeader = {
    name: {
      title: "שם",
      type: TABLE_CELL_TYPES.TEXT,
    },

    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [deleteAction],
    },
  };

  return (
    <div className={styles["files-page-wrapper"]}>
      <div className={styles["add-button-wrapper"]}>
        <CmsButton onClick={createNewFile} text="יצירת קובץ חדש" />
      </div>

      <TableCreator data={filesArray ?? []} header={header} />
    </div>
  );
}

export default FilesPage;
