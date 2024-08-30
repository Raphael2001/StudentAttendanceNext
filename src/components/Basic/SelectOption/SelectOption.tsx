import React from "react";

import styles from "./SelectOption.module.scss";
import ColorShower from "components/forms/ColorShower/ColorShower";
import { clsx } from "utils/functions";

type Props = {
  text: string;
  query?: string;
  onOptionClick: () => void;
  index: number;
  name: string;
  isHighlighted?: boolean;
  color?: string;
};

function SelectOption(props: Props) {
  const {
    query = "",
    text = "",
    onOptionClick,
    name,
    index,
    isHighlighted = false,
    color = "",
  } = props;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return (
    <button
      className={clsx(
        styles["option"],
        isHighlighted ? styles["highlight"] : ""
      )}
      onClick={onOptionClick}
      data-index={`${name}_${index}`}
    >
      {color && <ColorShower color={color} className={styles["color-item"]} />}
      <span className={styles["option-text"]}>
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part.toLowerCase() === query.toLowerCase() ? styles["bold"] : ""
            }
          >
            {part}
          </span>
        ))}
      </span>
    </button>
  );
}

export default SelectOption;
