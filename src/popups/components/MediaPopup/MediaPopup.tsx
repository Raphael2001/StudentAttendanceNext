"use client";

import React, { useRef, useState } from "react";

import styles from "./MediaPopup.module.scss";
import Switch from "components/forms/Switch/Switch";
import AnimatedInput from "components/forms/AnimatedInput";
import CmsButton from "components/CmsButton/CmsButton";
import { inputEvent } from "utils/types/inputs";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import Api from "api/requests";
import UploadFileButton from "components/forms/UploadFileButton/UploadFileButton";
import { SlidePopupRef } from "utils/types/popup";

export default function MediaPopup() {
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState(false);
  const [mediaType, setMediaType] = useState<string>("image");
  const [alt, setAlt] = useState("");
  const [name, setName] = useState("");
  const [base64, setBase64] = useState<string | ArrayBuffer | null>("");
  const [url, setUrl] = useState("");

  const ref = useRef<SlidePopupRef>();

  function onMediaChange(e: inputEvent) {
    const fileList = e.target.files;
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        if (
          fileList[i].type.match(/^image\//) ||
          fileList[i].type.match(/^video\//)
        ) {
          const file = fileList[i];
          if (file !== null) {
            const url = URL.createObjectURL(file);
            getBase64(file, (result) => {
              setBase64(result);
            });
            setMediaType(file.type.split("/")[0]);
            setCurrentMedia(url);
          }
          return;
        }
      }
    }
  }

  function onUrlChange(e: inputEvent) {
    const { value } = e.target;
    setUrl(value);
    setCurrentMedia(value);
  }

  function onBlurUrl() {
    if (url.startsWith("https://www.youtube.com")) {
      const paramsString = url.split("?")?.[1];
      const searchParams = new URLSearchParams(paramsString);
      setCurrentMedia(`https://www.youtube.com/embed/${searchParams.get("v")}`);
    }
  }

  function showUrl() {
    return (
      <div className={styles["url-wrapper"]}>
        <AnimatedInput
          placeholder="קישור למדיה"
          className={styles["input-wrapper"]}
          value={url}
          name="url"
          onChange={onUrlChange}
          type="text"
          onBlur={onBlurUrl}
        />

        <div className={styles["switch-wrapper"]}>
          <div>תמונה</div>
          <Switch
            className={styles["switch"]}
            state={mediaType === "video"}
            onClick={() =>
              setMediaType((prev) => (prev === "video" ? "image" : "video"))
            }
          />
          <div>סרטון</div>
        </div>
      </div>
    );
  }

  function showMedia() {
    if (currentMedia) {
      switch (mediaType) {
        case "image":
          return <img className={styles["media"]} src={currentMedia} />;
        case "video":
          if (base64) {
            return <video className={styles["media"]} src={currentMedia} />;
          } else {
            <iframe className={styles["media"]} src={currentMedia} />;
          }
      }
    } else {
      return (
        <UploadFileButton
          placeholder="נא לבחור מדיה"
          accept="image/heic, image/*, video/*"
          onChange={onMediaChange}
        />
      );
    }
  }

  function onAltTextChange(event: inputEvent) {
    const { value } = event.target;

    setAlt(value);
  }

  function onNameChange(event: inputEvent) {
    const { value } = event.target;

    setName(value);
  }

  function getBase64(
    file: File,
    cb: (base64: string | ArrayBuffer | null) => void
  ) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  function onSuccess(data) {
    ref.current?.animateOut();
  }
  function addMediaHandler() {
    const payload = {
      alt: alt,
      name: name,
      type: mediaType,
    };
    if (base64) {
      payload["photobase64"] = base64;
    } else if (url) {
      payload["url"] = url;
    }
    Api.addMedia({ payload, onSuccess });
  }

  function removeMedia() {
    setCurrentMedia(null);
  }

  function onUploadUrlChange() {
    setUploadUrl((prev) => {
      if (prev) {
        setUrl("");
      } else {
        setBase64("");
      }
      setCurrentMedia(null);
      return !prev;
    });
  }

  return (
    <SlidePopup className={styles["media-popup"]} ref={ref}>
      <div className={styles["media-container"]}>
        <div className={styles["switch-wrapper"]}>
          <div>העלאת מדיה</div>
          <Switch
            className={styles["switch"]}
            state={uploadUrl}
            onClick={onUploadUrlChange}
          />
          <div>מדיה מקישור</div>
        </div>
        <div className={styles["media-chooser"]}>
          {uploadUrl ? showUrl() : showMedia()}
        </div>

        <AnimatedInput
          placeholder="שם"
          value={name}
          name="name"
          onChange={onNameChange}
          type="text"
          className={styles["input-wrapper"]}
        />

        <AnimatedInput
          placeholder="טקסט חלופי"
          value={alt}
          name="alt"
          onChange={onAltTextChange}
          type="text"
          className={styles["input-wrapper"]}
        />

        <div className={styles["actions"]}>
          <CmsButton
            text={"הוסף"}
            onClick={addMediaHandler}
            isDisabled={!currentMedia}
            className={styles["button"]}
          />

          <CmsButton
            text={"הסר מדיה"}
            onClick={removeMedia}
            isDisabled={!currentMedia}
            color="red"
            className={styles["button"]}
          />
        </div>
      </div>
    </SlidePopup>
  );
}
