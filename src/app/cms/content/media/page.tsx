"use client";
import React, { useState } from "react";

import Api from "api";

import styles from "./media.module.scss";

import { clsx } from "../../../../utils/functions";
import TextInput from "components/General/Forms/TextInput/TextInput";
import SmartMedia from "components/App/SmartMedia/SmartMedia";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/PopupTypes";
import CmsButton from "components/Cms/CmsButton/CmsButton";
import usePermission from "utils/hooks/usePermission";
import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import { Media } from "utils/types/media";
import CloseButton from "components/General/CloseButton/CloseButton";
export default function MediaPage() {
  const media = useAppSelector((store) => store.init.media);
  usePermission(CMS_MODULES.LIBRARY);

  const translate = useCMSTranslate();

  const [query, setQuery] = useState("");

  const onQueryChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const getMediasByQuery = () => {
    return media.filter((media) =>
      media.name.toLowerCase().includes(query.toLowerCase()),
    );
  };
  const openPopup = usePopup();

  return (
    <div className={styles["all-media"]}>
      <div className={styles["row"]}>
        <TextInput
          placeholder={translate("search_media")}
          value={query}
          onChange={onQueryChange}
          className={styles["search-box"]}
        />
        <CmsButton
          text={translate("add_media")}
          onClick={() => openPopup(POPUP_TYPES.MEDIA)}
        />
      </div>
      <div className={styles["medias-container"]}>
        {media &&
          getMediasByQuery().map((media) => {
            return <MediaBox key={`media-${media._id}`} media={media} />;
          })}
      </div>
    </div>
  );
}

type MediaBoxProps = {
  className?: string;
  media: Media;
};

function MediaBox(props: MediaBoxProps) {
  const { className, media } = props;

  const onRemoveClick = () => {
    const props = {
      payload: {
        _id: media._id,
      },
    };
    Api.cms.media.DELETE(props);
  };

  return (
    <div className={clsx(styles["media-container"], className)}>
      <SmartMedia
        className={styles["media"]}
        item={media}
        skeletonClassName={styles["media-wrapper"]}
      />
      <div className={styles["media-container-footer"]}>
        <div className={styles["media-name"]}>{media.name}</div>
      </div>
      <CloseButton className={styles["close-button"]} onClick={onRemoveClick} />
    </div>
  );
}
