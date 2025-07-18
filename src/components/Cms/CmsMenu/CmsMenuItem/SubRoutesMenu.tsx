"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { CMSModuleRoute } from "utils/types/init";
import { clsx } from "utils/functions";
import Collapse from "components/General/Collapse/Collapse";
import ActiveLink from "components/General/Navigation/ActiveLink/ActiveLink";
import Text from "components/App/Text/Text";
import styles from "./CmsMenuItem.module.scss";

import LinkItemContent from "./LinkItemContent";

import useCmsSideBar from "utils/hooks/useCmsSideBar";

type Props = {
  routes: CMSModuleRoute[];
  title?: string;
  module: string;
};

export default function SubRoutesMenu({ routes, title = "", module }: Props) {
  const pathname = usePathname();
  const { isSideBarOpen, toggleCollapse, isCollapseOpen } = useCmsSideBar();

  const isActive = routes.some(({ href }) => pathname?.includes(href));

  return (
    <div className={styles["routes-button"]}>
      <button
        className={clsx(
          styles["sidebar-menu-link"],
          isActive && styles["active"],
          isCollapseOpen && styles["collapse-open"],
          isSideBarOpen && styles["sidebar-open"],
        )}
        onClick={toggleCollapse}
      >
        <LinkItemContent
          module={module}
          isActive={isActive}
          title={title}
          showChevron
        />
      </button>

      <Collapse open={isCollapseOpen}>
        <div className={clsx(styles["sub-menu-wrapper"])}>
          <ul className={styles["sub-menu"]}>
            {routes.map(({ href, title }, index) => (
              <li
                className={styles["sub-menu-item"]}
                key={`sub-item-${index}-${module}`}
              >
                <div className={styles["line"]} />
                <ActiveLink href={href}>
                  <Text
                    tag="span"
                    className={clsx(
                      styles["menu-link-text"],
                      styles["sub-menu-text"],
                    )}
                  >
                    {title}
                  </Text>
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>
      </Collapse>
    </div>
  );
}
