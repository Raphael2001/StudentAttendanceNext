"use client";

import React from "react";

import styles from "./MediaAutoComplete.module.scss";
import AutoComplete from "components/forms/AutoComplete/AutoComplete";
import { useAppSelector } from "utils/hooks/useRedux";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";

type Props = {
  value: string;
  onChange: (name: string, option: any) => void;
};

function MediaAutoComplete(props: Props) {
  const { value, onChange } = props;

  const media = useAppSelector((store) => store.init?.media) ?? {};
  const mediaArray = Object.values(media);
  const openPopup = usePopup();

  return (
    <div className={styles["media-auto-complete"]}>
      <AutoComplete
        value={value}
        options={mediaArray}
        onChange={onChange}
        field="name"
      />

      <button
        className={styles["plus-icon"]}
        onClick={() => openPopup(POPUP_TYPES.MEDIA)}
      >
        +
      </button>
    </div>
  );
}

export default MediaAutoComplete;
