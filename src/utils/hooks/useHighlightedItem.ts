import React, { useMemo, useState } from "react";
import { onKeyDownButton, onKeyDownInput } from "utils/types/inputs";

type Props = {
  options: Array<any>;
  field?: string;
  query?: string;
  onOptionClick: (item: any) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  name: string;
};

function useHighlightedItem(props: Props) {
  const {
    options,
    field = "text",
    query = "",
    onOptionClick,
    isOpen,
    setIsOpen,
    name,
  } = props;
  const [highlightedItem, setHighlightedItem] = useState(-1);

  const filteredOptions = useMemo(
    () => options.filter((o) => o[field].includes(query)),
    [options, query, field]
  );

  const getHighlightedElement = (elIndex: number) => {
    const element = document.querySelector(
      `li[data-index="${name}_${elIndex}"]`
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };
  function handleKeyDown(e: onKeyDownButton | onKeyDownInput) {
    let newHighlightedItem = highlightedItem;

    if (e) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          newHighlightedItem = (highlightedItem + 1) % options.length;
          getHighlightedElement(newHighlightedItem);
          break;

        case "ArrowUp":
          e.preventDefault();
          newHighlightedItem =
            (highlightedItem - 1 + options.length) % options.length;
          getHighlightedElement(newHighlightedItem);
          break;

        case "Enter":
          e.preventDefault();
          if (isOpen) {
            const option = options[highlightedItem];
            onOptionClick(option);
          } else {
            setIsOpen(true);
          }
          break;

        case "Escape":
          e.preventDefault();
          setHighlightedItem(-1);

          setIsOpen(false);
          break;

        default:
          break;
      }
    }
    setHighlightedItem(newHighlightedItem);
  }

  return { highlightedItem, filteredOptions, handleKeyDown };
}

export default useHighlightedItem;
