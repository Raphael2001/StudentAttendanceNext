"use client";

import React from "react";

import styles from "./register.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import POPUP_TYPES from "constants/popup-types";
import usePermission from "utils/hooks/usePermission";
import usePopup from "utils/hooks/usePopup";
import CMS_MODULES from "constants/CMSModules";

function RegisterPage() {
  const openPopup = usePopup();

  usePermission(CMS_MODULES.REGISTER);

  function uploadFileButton() {
    openPopup(POPUP_TYPES.UPLOAD_EXCEL_FILE, {
      moduleName: CMS_MODULES.REGISTER,
    });
  }

  return (
    <div className={styles["page-wrapper"]}>
      <CmsButton onClick={uploadFileButton} text="העלת קובץ" />
    </div>
  );
}

export default RegisterPage;
