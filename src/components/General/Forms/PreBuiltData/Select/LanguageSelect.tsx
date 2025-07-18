"use client";

import React from "react";

import Select from "components/General/Forms/Select/Select";
import { useAppSelector } from "utils/hooks/useRedux";
import { SelectDataProps } from "utils/types/form";

export default function LanguageSelect(props: SelectDataProps) {
  const languages = useAppSelector((store) => store.init.languages);

  return <Select options={languages} field="lang" {...props} />;
}
