import LINKS_TYPES from "constants/LinksTypes";
import Link from "next/link";
import React from "react";
import { LinkInit } from "utils/types/links";

type Props = {
  linkItem: LinkInit;
  className?: string;
  children?: any;
};

function DynamicLink({ linkItem, className = "", children }: Props) {
  const { linkType, link } = linkItem;
  const linkTypeObj = LINKS_TYPES[linkType];
  const template: string = linkTypeObj.template;
  const href = template.replace("{link}", link);

  switch (linkType) {
    case LINKS_TYPES.LINK_INTERNAL._id:
      return (
        <Link href={href} className={className}>
          {children && children}
        </Link>
      );
    case LINKS_TYPES.EMAIL._id:
    case LINKS_TYPES.LINK_EXT._id:
    case LINKS_TYPES.PHONE._id:
      return (
        <a href={href} className={className} target="_blank" rel="noreferrer">
          {children && children}
        </a>
      );
    default:
      return <button className={className}>{children && children}</button>;
  }
}

export default DynamicLink;
