"use client";

import styles from "./FilesPopup.module.scss";

import React, { useRef, useState } from "react";

import AnimatedInput from "components/forms/AnimatedInput";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import CmsButton from "components/CmsButton/CmsButton";
import { inputEvent } from "utils/types/inputs";
import UploadFileButton from "components/forms/UploadFileButton/UploadFileButton";
import { SlidePopupRef } from "utils/types/popup";
import Api from "api/requests";

function FilesPopup() {
  const [currentMedia, setCurrentMedia] = useState<File>();

  const [name, setName] = useState("");

  const ref = useRef<SlidePopupRef>();

  function onMediaChange(e: inputEvent) {
    const fileList = e.target.files;
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        setCurrentMedia(file);
        return;
      }
    }
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
    if (currentMedia) {
      getBase64(currentMedia, (base64) => {
        const payload = {
          name: name,

          file: base64,
        };

        Api.addFile({ payload, onSuccess });
      });
    }
  }

  return (
    <SlidePopup className={styles["media-popup"]} ref={ref}>
      <div className={styles["media-container"]}>
        <div className={styles["media-chooser"]}>
          <UploadFileButton
            placeholder="נא לבחור מדיה"
            accept=".pdf, .doc, .docx, .txt"
            onChange={onMediaChange}
            value={currentMedia}
            inputClassName={styles["media-input"]}
          />
        </div>

        <AnimatedInput
          placeholder="שם"
          value={name}
          name="name"
          onChange={onNameChange}
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
        </div>
      </div>
    </SlidePopup>
  );
}

export default FilesPopup;
