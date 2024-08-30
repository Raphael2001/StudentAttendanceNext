import { TextType } from "utils/types/initApp";
import { useAppSelector } from "./useRedux";

export default function useTranslate() {
  const texts = useAppSelector((store) => store.initApp.texts);

  function translate(key = ""): TextType {
    if (key in texts) {
      return texts[key];
    }
    return {
      tag: "span",
      text: key,
    };
  }
  return translate;
}
