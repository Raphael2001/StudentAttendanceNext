"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import GeneralInfoInput from "../GeneralInfoInput/GeneralInfoInput";

import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";
import TableCreator from "components/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";

import XIcon from "/public/assets/icons/close-icon.svg";
import Pencil from "/public/assets/icons/pencil.svg";
import Trash from "/public/assets/icons/trash.svg";
import styles from "./GeneralRow.module.scss";
import useGeneralInfo from "utils/hooks/useGeneralInfo";
import GeneralInfoInputTypes from "constants/GeneralInfoInputTypes";
import { useAppSelector } from "utils/hooks/useRedux";

import { copy } from "utils/functions";
import { generalInfoItem } from "utils/types/init";
import useDeleteItem from "utils/hooks/useDeleteItem";
import Api from "api/requests";

type Props = {
  name: string;
};

function GeneralRow(props: Props) {
  const { name } = props;
  const { cmsTitle } = useGeneralInfo(name);
  const openPopup = usePopup();
  const deleteItem = useDeleteItem();

  function deleteItemHandler() {
    deleteItem("למחוק את הגדרה הזו?", callback);
    function callback(onSuccess) {
      const payload = { name: name };
      Api.deleteGeneralInfo({ payload, onSuccess });
    }
  }

  return (
    <div className={styles["general-row-wrapper"]}>
      <div className={styles["title-wrapper"]}>
        <h3 className={styles["general-info-title"]}>{cmsTitle}</h3>
        <button
          className={styles["icon-wrapper"]}
          onClick={() => openPopup(POPUP_TYPES.EDIT_GENERAL_INFO, { name })}
        >
          <img src={Pencil.src} />
        </button>
        <button className={styles["icon-wrapper"]} onClick={deleteItemHandler}>
          <img src={Trash.src} />
        </button>
      </div>
      <RenderInputs name={name} />
    </div>
  );
}

export default GeneralRow;

type inputsProps = {
  name: string;
};

function RenderInputs(props: inputsProps) {
  const { name } = props;
  const media = useAppSelector((store) => store.init.media);
  const links = useAppSelector((store) => store.init.links);
  const files = useAppSelector((store) => store.init.files);

  const { multiValues, value, removeItemById, inputType } =
    useGeneralInfo(name);

  const deleteAction = {
    icon: XIcon.src,
    onClick: onDelete,
  };

  const formatHeader = useCallback(() => {
    switch (inputType) {
      case GeneralInfoInputTypes.MEDIA._id:
        return {
          data: {
            title: "שם",
            type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
            dataset: Object.values(media),
            displayField: "name",
          },
        };
      case GeneralInfoInputTypes.FILE._id:
        return {
          data: {
            title: "שם",
            type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
            dataset: Object.values(files),
            displayField: "name",
          },
        };

      case GeneralInfoInputTypes.LINK._id:
        return {
          data: {
            title: "שם",
            type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
            dataset: links,
            displayField: "name",
          },
        };

      case GeneralInfoInputTypes.TEXT._id:
      default:
        return { data: { title: "תוכן", type: TABLE_CELL_TYPES.TEXT } };
    }
  }, [inputType, media, links]);

  const tableData = useMemo(() => copy(value), [value]);

  const [tableHeader, setTableHeader] = useState({
    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [deleteAction],
    },
  });

  useEffect(() => {
    if (multiValues) {
      const header = formatHeader();
      setTableHeader((prevState) => {
        return { ...header, ...prevState };
      });
    }
  }, [formatHeader, multiValues]);

  function onDelete(item: generalInfoItem) {
    removeItemById(item._id);
  }

  return (
    <div className={styles["inputs"]}>
      <GeneralInfoInput name={name} />
      {multiValues && <TableCreator header={tableHeader} data={tableData} />}
    </div>
  );
}
