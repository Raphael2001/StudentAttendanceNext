import { useAppSelector } from "./useRedux";

export default function useTranslate() {
  const texts = useAppSelector((store) => store.initApp.texts);

  function translate(key = ""): string {
    if (key in texts) {
      return texts[key];
    }
    return key;
  }
  return translate;
}
