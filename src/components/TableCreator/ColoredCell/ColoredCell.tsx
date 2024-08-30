import React, { useRef, useState } from "react";

import styles from "./ColoredCell.module.scss";
import {
  TableColorCell,
  TableColorCellOption,
  TableColorCellOptionClick,
} from "utils/types/table";
import { clsx, generateUniqueId } from "utils/functions";
import { useOutsideClick } from "utils/hooks/useOutsideClick";
import Scrollbar from "components/ScrollBar/Scrollbar";

import DropDown from "/public/assets/icons/drop-down.svg";

type Props = {
  options: TableColorCell;
  value: string;
  onOptionClick?: TableColorCellOptionClick;
  id: string;
};

const defaultId = generateUniqueId(16);
function ColoredCell({ options, value, onOptionClick, id }: Props) {
  const item = options[value];
  const { color, title } = item;
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, closeDropDown);
  const isSelect = typeof onOptionClick === "function";
  function closeDropDown() {
    setIsOpen(false);
  }

  function optionClickHandler(item: TableColorCellOption) {
    typeof onOptionClick === "function" && onOptionClick(id, item);
  }

  return (
    <div
      className={clsx(
        styles["colored-cell-conatiner"],
        isOpen ? styles["active"] : ""
      )}
    >
      <button
        ref={wrapperRef}
        onClick={() => setIsOpen((prevState) => !prevState)}
        className={`${styles["colored-cel-wrapper"]} light-item border text ${color}`}
      >
        {title}
      </button>
      {isSelect && (
        <>
          <div className={clsx(styles["arrow"], "icon", color)}>
            <img src={DropDown.src} />
          </div>
          <SelectOptions
            options={options}
            isOpen={isOpen}
            onOptionClick={optionClickHandler}
          />
        </>
      )}
    </div>
  );
}

export default ColoredCell;

type SelectProps = {
  options: TableColorCell;
  isOpen: boolean;

  onOptionClick: (item: TableColorCellOption) => void;
};

function SelectOptions(props: SelectProps) {
  const { options, isOpen, onOptionClick } = props;
  const optionsItems = Object.values(options);

  return (
    <Scrollbar
      className={clsx(
        styles["options-wrapper"],
        isOpen ? styles["active"] : ""
      )}
      contentClassName={styles["options-content"]}
    >
      <>
        {optionsItems.map((item) => {
          return (
            <button
              onClick={() => onOptionClick(item)}
              key={"option" + defaultId + item.id}
              className={clsx(styles["option-item"])}
            >
              {item.title}
            </button>
          );
        })}
      </>
    </Scrollbar>
  );
}
