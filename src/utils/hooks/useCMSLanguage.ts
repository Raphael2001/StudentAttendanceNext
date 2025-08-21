"use client";

import { useAppSelector } from "./useRedux";

export default function useCMSLanguage() {
  const languages = useAppSelector((store) => store.init.languages);

  function convertLanguageId(id: string) {
    const lang = languages.find((l) => l._id === id);

    if (lang) {
      return lang.langId;
    }
    return id;
  }

  function revertLanguage(language: string) {
    const lang = languages.find((l) => l.langId === language);
    if (lang) {
      return lang._id;
    }
    return language;
  }

  return { convertLanguageId, revertLanguage };
}
