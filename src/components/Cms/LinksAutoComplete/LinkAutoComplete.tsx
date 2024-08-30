"use client";

import React from "react";

import styles from "./LinkAutoComplete.module.scss";
import AutoComplete from "components/forms/AutoComplete/AutoComplete";
import { useAppSelector } from "utils/hooks/useRedux";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";

type Props = {
  value: string;
  onChange: (name: string, option: any) => void;
};

function LinksAutoComplete(props: Props) {
  const { value, onChange } = props;

  const links = useAppSelector((store) => store.init?.links) ?? [];

  const openPopup = usePopup();

  return (
    <div className={styles["link-auto-complete"]}>
      <AutoComplete
        value={value}
        options={links}
        onChange={onChange}
        field="name"
      />

      <button
        className={styles["plus-icon"]}
        onClick={() => openPopup(POPUP_TYPES.LINKS)}
      >
        +
      </button>
    </div>
  );
}

export default LinksAutoComplete;
