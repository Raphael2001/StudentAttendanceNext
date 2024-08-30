"use client";

import React, { useRef, useState } from "react";

import styles from "./MultiSelectAutoComplete.module.scss";
import { useOutsideClick } from "utils/hooks/useOutsideClick";
import TextInput from "../TextInput/TextInput";
import { inputEvent } from "utils/types/inputs";
import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";
import OptionsList from "components/Basic/OptionsList/OptionsList";
import useHighlightedItem from "utils/hooks/useHighlightedItem";
import { generalServerItem } from "utils/types/general";
import { clsx } from "utils/functions";

type Props = {
  options: Array<generalServerItem>;
  showError?: boolean;
  errorMessage?: string;
  id?: string;
  name?: string;
  onChange: (name: string, option: any) => void;
  value: Array<string>;
  placeholder?: string;
  className?: string;
  field?: string;
  disabled?: boolean;
};

function MultiSelectAutoComplete(props: Props) {
  const {
    options = [],
    showError = false,
    errorMessage = "",
    id = "",
    name = "",
    onChange,
    value = [],
    placeholder = "",
    field = "text",
    className,
    disabled = false,
  } = props;

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { highlightedItem, filteredOptions, handleKeyDown } =
    useHighlightedItem({
      options,
      field,
      onOptionClick,
      query: input,
      isOpen,
      setIsOpen,
      name,
    });

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, closeList);

  function onChangeInput(e: inputEvent) {
    const { value } = e.target;

    setInput(value);
  }

  function onOptionClick(item) {
    onChange(name, item);
    closeList();
  }

  function closeList() {
    setIsOpen(false);
  }

  return (
    <div
      className={clsx(styles["autocomplete-wrapper"], className)}
      ref={wrapperRef}
    >
      <TextInput
        onChange={onChangeInput}
        placeholder={placeholder}
        value={input}
        onFocus={() => setIsOpen(true)}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
      <OptionsList
        query={input}
        options={filteredOptions}
        field={field}
        onOptionClick={onOptionClick}
        isOpen={isOpen}
        name={name}
        highlightedItem={highlightedItem}
      />

      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
}

export default MultiSelectAutoComplete;
