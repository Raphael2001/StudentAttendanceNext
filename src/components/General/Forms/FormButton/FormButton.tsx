import React from "react";

export default function FormButton(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) {
  const { onClick } = props;

  function onClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (typeof onClick === "function") {
      onClick(e);
    }
  }

  return <button {...props} onClick={onClickHandler} />;
}
