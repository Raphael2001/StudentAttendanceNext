import { TextType } from "utils/types/initApp";
import { useAppSelector } from "./useRedux";

export default function useTranslate() {
  const texts = useAppSelector((store) => store.initApp.texts);

  function translate(key = "", textOnly: boolean = false): string | TextType {
    if (key in texts) {
      return textOnly ? texts[key].text : texts[key];
    }
    return textOnly ? key : { tag: "span", text: key };
  }

  return translate;
}
