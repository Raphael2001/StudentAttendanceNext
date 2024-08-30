import Text from "components/Text/Text";
import React from "react";
import { TextType } from "utils/types/initApp";

type Props = {
  value: TextType;
  className?: string;
};

function AppText(props: Props) {
  const { value, className = "" } = props;
  const { tag, text } = value;

  return (
    <Text tag={tag} className={className}>
      {text}
    </Text>
  );
}

export default AppText;
