import React from "react";

import styles from "./OptionsList.module.scss";
import SelectOption from "../SelectOption/SelectOption";
import { clsx } from "utils/functions";

type Props = {
  options: Array<any>;
  field: string;
  query?: string;
  onOptionClick: (item: any) => void;
  isOpen: boolean;
  name: string;
  highlightedItem?: number;
};

function OptionsList(props: Props) {
  const {
    options = [],
    query = "",
    field = "",
    onOptionClick,
    isOpen = false,
    name = "",
    highlightedItem = -1,
  } = props;

  return (
    <div
      className={clsx(
        styles["options-wrapper"],
        isOpen ? styles["active"] : ""
      )}
    >
      <div className={styles["options-list"]}>
        {options.map((item, index) => {
          return (
            <SelectOption
              key={"option" + index}
              onOptionClick={() => onOptionClick(item)}
              text={item[field]}
              query={query}
              name={name}
              index={index}
              isHighlighted={highlightedItem === index}
              color={item?.color ?? ""}
            />
          );
        })}
      </div>
    </div>
  );
}

export default OptionsList;
