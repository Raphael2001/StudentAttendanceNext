"use client";

import CMS_MODULES from "constants/CMSModules";
import usePermission from "utils/hooks/usePermission";

import styles from "./main.module.scss";

export default function Main() {
  usePermission(CMS_MODULES.MAIN);
}
