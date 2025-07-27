import LocalCMSTranslations from "utils/cms-translations.json";
export default function useCMSTranslate() {
  function translate(key = ""): string {
    if (key in LocalCMSTranslations) {
      return LocalCMSTranslations[key];
    }
    return key;
  }
  return translate;
}
