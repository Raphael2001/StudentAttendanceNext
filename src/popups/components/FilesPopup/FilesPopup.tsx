"use client";

import styles from "./FilesPopup.module.scss";

import React, { useRef, useState } from "react";

import AnimatedInput from "components/General/Forms/AnimatedInput/AnimatedInput";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import CmsButton from "components/Cms/CmsButton/CmsButton";
import { InputEvent } from "utils/types/inputs";
import { SlidePopupRef } from "utils/types/popup";
import Api from "api";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import MediaUploadBox from "components/Cms/MediaUploadBox/MediaUploadBox";
import { fileToBase64 } from "utils/functions";

function FilesPopup({ popupIndex }: { popupIndex: number }) {
  const [currentFile, setCurrentFile] = useState<File | null>();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const translate = useCMSTranslate();

  const ref = useRef<SlidePopupRef>(null);

  function onNameChange(event: InputEvent) {
    const { value } = event.target;

    setName(value);
  }

  function onSuccess() {
    setIsLoading(false);
    ref.current?.animateOut();
  }
  async function addMediaHandler() {
    setIsLoading(true);
    if (currentFile) {
      const base64 = await fileToBase64(currentFile);
      const payload = {
        name: name,
        file: base64,
      };

      Api.cms.file.POST({
        payload,
        config: { onSuccess, onFailure: () => setIsLoading(false) },
      });
    }
  }

  return (
    <SlidePopup
      popupIndex={popupIndex}
      className={styles["media-popup"]}
      ref={ref}
      isLoading={isLoading}
      showCloseIcon
    >
      <div className={styles["media-container"]}>
        <MediaUploadBox
          accept=".pdf, .doc, .docx, .txt"
          currentFile={currentFile}
          onFileChange={(file: File | null) => setCurrentFile(file)}
        />

        <AnimatedInput
          placeholder={translate("media_name")}
          value={name}
          name="name"
          onChange={onNameChange}
          type="text"
          className={styles["input-wrapper"]}
        />

        <div className={styles["actions"]}>
          <CmsButton
            text={translate("add_action")}
            onClick={addMediaHandler}
            isDisabled={!currentFile}
            className={styles["button"]}
          />
        </div>
      </div>
    </SlidePopup>
  );
}

export default FilesPopup;
