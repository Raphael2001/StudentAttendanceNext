"use client";

import styles from "./CmsMenuItem.module.scss";
import { CMSModule } from "utils/types/init";
import RouteLinkItem from "./RouteLinkItem";
import SubRoutesMenu from "./SubRoutesMenu";

type Props = {
  module: CMSModule;
};

export default function CmsMenuItem({ module }: Props) {
  const { routes, route, _id, title } = module;

  return (
    <div className={styles["menu-link"]}>
      {route && <RouteLinkItem route={route} module={_id} />}
      {!!routes?.length && (
        <SubRoutesMenu routes={routes} module={_id} title={title} />
      )}
    </div>
  );
}
