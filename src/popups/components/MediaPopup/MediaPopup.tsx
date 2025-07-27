"use client";

import React, { useRef, useState } from "react";

import styles from "./MediaPopup.module.scss";
import Switch from "components/General/Forms/Switch/Switch";
import AnimatedInput from "components/General/Forms/AnimatedInput/AnimatedInput";
import CmsButton from "components/Cms/CmsButton/CmsButton";
import { InputEvent } from "utils/types/inputs";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import Api from "api";
import { SlidePopupRef } from "utils/types/popup";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import MediaUploadBox from "components/Cms/MediaUploadBox/MediaUploadBox";
import { fileToBase64 } from "utils/functions";

export default function MediaPopup({ popupIndex }: { popupIndex: number }) {
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [alt, setAlt] = useState("");
  const [name, setName] = useState("");

  const [isLocalFile, setIsLocalFile] = useState<boolean>(true);

  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const translate = useCMSTranslate();

  const ref = useRef<SlidePopupRef>(null);

  function onUrlChange(e: InputEvent) {
    const { value } = e.target;
    setUrl(value);
  }

  function onAltTextChange(event: InputEvent) {
    const { value } = event.target;

    setAlt(value);
  }

  function onNameChange(event: InputEvent) {
    const { value } = event.target;

    setName(value);
  }

  function onSuccess(data) {
    setIsLoading(false);
    ref.current?.animateOut();
  }
  async function addMediaHandler() {
    setIsLoading(true);
    const payload = {
      alt: alt,
      name: name,
      type: mediaType,
    };
    if (currentFile) {
      const base64 = await fileToBase64(currentFile);
      payload["photobase64"] = base64;
    } else if (url) {
      let currentUrl = url;
      if (currentUrl.startsWith("https://www.youtube.com")) {
        const paramsString = currentUrl.split("?")?.[1];
        const searchParams = new URLSearchParams(paramsString);
        currentUrl = `https://www.youtube.com/embed/${searchParams.get("v")}`;
      }
      payload["url"] = currentUrl;
    }
    Api.cms.media.POST({
      payload,
      config: { onSuccess, onFailure: () => setIsLoading(false) },
    });
  }

  function changeMediaType() {
    setUrl("");
    setMediaType("image");
    setCurrentFile(null);
    setIsLocalFile((prev) => !prev);
  }

  function showUrl() {
    return (
      <div className={styles["url-wrapper"]}>
        <AnimatedInput
          placeholder={translate("media_from_url")}
          className={styles["input-wrapper"]}
          value={url}
          name="url"
          onChange={onUrlChange}
          type="text"
        />

        <div className={styles["switch-wrapper"]}>
          <div>{translate("image")}</div>
          <Switch
            className={styles["switch"]}
            state={mediaType === "video"}
            onClick={() =>
              setMediaType((prev) => (prev === "video" ? "image" : "video"))
            }
          />
          <div>{translate("video")}</div>
        </div>
      </div>
    );
  }

  return (
    <SlidePopup
      className={styles["media-popup"]}
      ref={ref}
      isLoading={isLoading}
      popupIndex={popupIndex}
      showCloseIcon
    >
      <div className={styles["media-container"]}>
        <div className={styles["switch-wrapper"]}>
          <div>{translate("media_from_url")}</div>

          <Switch
            className={styles["switch"]}
            state={isLocalFile}
            onClick={changeMediaType}
          />

          <div>{translate("upload_media_title")}</div>
        </div>

        {isLocalFile ? (
          <MediaUploadBox
            accept="image/heic, image/*, video/*"
            currentFile={currentFile}
            onFileChange={(file: File | null) => setCurrentFile(file)}
          />
        ) : (
          showUrl()
        )}

        <AnimatedInput
          placeholder={translate("media_name")}
          value={name}
          name="name"
          onChange={onNameChange}
          type="text"
          className={styles["input-wrapper"]}
        />
        <AnimatedInput
          placeholder={translate("media_alt")}
          value={alt}
          name="alt"
          onChange={onAltTextChange}
          type="text"
          className={styles["input-wrapper"]}
        />
        <div className={styles["actions"]}>
          <CmsButton
            text={translate("add_action")}
            onClick={addMediaHandler}
            isDisabled={!currentFile && !url}
            className={styles["button"]}
          />
        </div>
      </div>
    </SlidePopup>
  );
}
