import React from "react";

import styles from "./Text.module.scss";
import { clsx } from "utils/functions";
import TEXT_TAGS from "constants/TextTags";
import { TextTagsKeys } from "utils/types/init";

type Props = {
  className?: string;
  tag: TextTagsKeys;
  children: React.ReactElement | string;
};

function Text(props: Props) {
  const { tag, className, children } = props;

  const textProps = {
    className: clsx(styles["text"], className),
  };

  switch (tag) {
    case TEXT_TAGS.h1._id:
      return <h1 {...textProps}>{children}</h1>;
    case TEXT_TAGS.h2._id:
      return <h2 {...textProps}>{children}</h2>;
    case TEXT_TAGS.h3._id:
      return <h3 {...textProps}>{children}</h3>;
    case TEXT_TAGS.h4._id:
      return <h4 {...textProps}>{children}</h4>;
    case TEXT_TAGS.h5._id:
      return <h5 {...textProps}>{children}</h5>;
    case TEXT_TAGS.h6._id:
      return <h6 {...textProps}>{children}</h6>;
    case TEXT_TAGS.b._id:
      return <b {...textProps}>{children}</b>;
    case TEXT_TAGS.label._id:
      return <label {...textProps}>{children}</label>;
    case TEXT_TAGS.p._id:
      return <p {...textProps}>{children}</p>;
    case TEXT_TAGS.strong._id:
      return <strong {...textProps}>{children}</strong>;
    case TEXT_TAGS.span._id:
    default:
      return <span {...textProps}>{children}</span>;
  }
}

export default Text;
