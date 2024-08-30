import React from "react";

import { clsx } from "utils/functions";

type Props = {
  color: string;
  className?: string;
};

function ColorShower(props: Props) {
  const { color, className = "" } = props;

  return <div className={clsx("item", color, className)}></div>;
}

export default ColorShower;
