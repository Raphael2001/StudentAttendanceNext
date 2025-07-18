import React from "react";
import { TextType } from "utils/types/initApp";
import Text from "../Text/Text";
import { getTextType } from "utils/functions/textFunctions";

type Props = {
  value: TextType | string;
  className?: string;
};

function AppText(props: Props) {
  const { value, className = "" } = props;
  const data = getTextType(value);
  const { tag, text } = data;

  return (
    <Text tag={tag} className={className}>
      {text}
    </Text>
  );
}

export default AppText;
