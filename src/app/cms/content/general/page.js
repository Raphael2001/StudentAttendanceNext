"use client";
import React from "react";

import styles from "./general.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import Languages from "components/Cms/Languages/Languages";

import GeneralRow from "components/Cms/GeneralRow/GeneralRow";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";

import CMS_MODULES from "constants/CMSModules";
import usePermission from "utils/hooks/usePermission";
import { useAppSelector } from "utils/hooks/useRedux";
export default function GeneralPage() {
  const generalInfo = useAppSelector((store) => store.init?.generalInfo);
  const openPopup = usePopup();
  usePermission(CMS_MODULES.GENERAL_INFO);

  return (
    <div className={styles["general-info-wrapper"]}>
      <Languages />

      <CmsButton
        text={"הוספת פרמטר חדש"}
        className="create"
        onClick={() => openPopup(POPUP_TYPES.GENERAL_INFO)}
      />

      {generalInfo &&
        Object.values(generalInfo).map((param) => {
          return <GeneralRow key={param._id} name={param.name} />;
        })}
    </div>
  );
}
