import React from "react";

import styles from "./CmsSideBarIcon.module.scss";
import SideBarHome from "components/General/Svg/SideBar/SideBarHome";
import { clsx } from "utils/functions";
import CMS_MODULES from "constants/CMSModules";
import SideBarLink from "components/General/Svg/SideBar/SideBarLink";
import SideBarSettings from "components/General/Svg/SideBar/SideBarSettings";
import SideBarMedia from "components/General/Svg/SideBar/SideBarMedia";
import SideBarText from "components/General/Svg/SideBar/SideBarText";
import SideBarMetaTags from "components/General/Svg/SideBar/SideBarMetaTags";
import SideBarUser from "components/General/Svg/SideBar/SideBarUser";
import SideBarDynamicPage from "components/General/Svg/SideBar/SideBarDynamicPage";

type Props = { module: string; className?: string; isActive?: boolean };

export default function CmsSideBarIcon(props: Props) {
  const { module, isActive, className } = props;

  const iconsClass = clsx(
    styles["icon"],
    isActive && styles["active"],
    className,
  );

  switch (module) {
    case CMS_MODULES.MAIN:
      return <SideBarHome className={iconsClass} />;

    case CMS_MODULES.LINKS:
      return <SideBarLink className={iconsClass} />;
    case CMS_MODULES.GENERAL_INFO:
      return <SideBarSettings className={iconsClass} />;
    case CMS_MODULES.LIBRARY:
      return <SideBarMedia className={iconsClass} />;
    case CMS_MODULES.TEXTS:
      return <SideBarText className={iconsClass} />;
    case CMS_MODULES.USERS:
      return <SideBarUser className={iconsClass} />;
    case CMS_MODULES.META_TAGS:
      return <SideBarMetaTags className={iconsClass} />;
    case CMS_MODULES.DYNAMIC_PAGES:
      return <SideBarDynamicPage className={iconsClass} />;
  }
}
