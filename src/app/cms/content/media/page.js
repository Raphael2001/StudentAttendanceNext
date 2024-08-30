"use client";
import React, { useState } from "react";

import Api from "api/requests";

import styles from "./media.module.scss";

import TrashBin from "/public/assets/icons/trash.svg";
import { clsx } from "../../../../utils/functions";
import TextInput from "../../../../components/forms/TextInput/TextInput";
import SmartMedia from "../../../../components/SmartMedia/SmartMedia";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";
import CmsButton from "components/CmsButton/CmsButton";
import usePermission from "utils/hooks/usePermission";
import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
export default function MediaPage() {
  const medias = useAppSelector((store) => store.init?.media);
  usePermission(CMS_MODULES.MEDIA);

  const [query, setQuery] = useState("");

  const onQueryChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const getMediasByQuery = () => {
    const allMedias = {};
    Object.keys(medias).forEach((img) => {
      if (medias[img].name.toLowerCase().includes(query.toLowerCase())) {
        allMedias[img] = medias[img];
      }
    });
    return allMedias;
  };
  const openPopup = usePopup();

  return (
    <div className={styles["all-media"]}>
      <div className={styles["row"]}>
        <TextInput
          placeholder={"חפש מדיה"}
          value={query}
          onChange={onQueryChange}
          className={styles["search-box"]}
        />
        <CmsButton
          text={"הוספת מדיה חדשה"}
          onClick={() => openPopup(POPUP_TYPES.MEDIA)}
        />
      </div>
      <div className={styles["medias-container"]}>
        {medias &&
          Object.keys(getMediasByQuery()).map((media, idx) => {
            return (
              <MediaBox
                key={`media-${media}-${idx}`}
                {...medias[media]}
                id={media}
              />
            );
          })}
      </div>
    </div>
  );
}

function MediaBox(props) {
  const { id, name, className } = props;

  const onRemoveClick = () => {
    const props = {
      payload: {
        id,
      },
    };
    Api.removeMedia(props);
  };

  return (
    <div className={clsx(styles["media-container"], className)}>
      <SmartMedia
        className={styles["media"]}
        item={props}
        skeletonClassName={styles["media-wrapper"]}
      />
      <div className={styles["media-container-footer"]}>
        <div className={styles["media-name"]}>{name}</div>
        <button className={styles["media-delete"]} onClick={onRemoveClick}>
          <img src={TrashBin.src} alt={"remove media"} />
        </button>
      </div>
    </div>
  );
}
