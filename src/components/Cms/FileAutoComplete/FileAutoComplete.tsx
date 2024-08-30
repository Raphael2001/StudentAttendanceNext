"use client";

import React from "react";

import styles from "./FileAutoComplete.module.scss";
import AutoComplete from "components/forms/AutoComplete/AutoComplete";
import { useAppSelector } from "utils/hooks/useRedux";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";

type Props = {
  value: string;
  onChange: (name: string, option: any) => void;
};

function FileAutoComplete(props: Props) {
  const { value, onChange } = props;

  const files = useAppSelector((store) => store.init?.files) ?? {};
  const filesArray = Object.values(files);
  const openPopup = usePopup();

  return (
    <div className={styles["file-auto-complete"]}>
      <AutoComplete
        value={value}
        options={filesArray}
        onChange={onChange}
        field="name"
      />

      <button
        className={styles["plus-icon"]}
        onClick={() => openPopup(POPUP_TYPES.FILES)}
      >
        +
      </button>
    </div>
  );
}

export default FileAutoComplete;
