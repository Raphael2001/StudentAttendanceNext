import LocalCMSTranslations from "utils/errors-translations.json";
export default function useErrorsTranslate() {
  function translate(key = ""): string {
    if (key in LocalCMSTranslations) {
      return LocalCMSTranslations[key];
    }
    return key;
  }
  return translate;
}
