"use client";

import POPUP_TYPES from "constants/PopupTypes";
import usePopup from "./usePopup";

function useDeleteItem() {
  const openPopup = usePopup();

  return (text: string, callback: (props?: Object) => void) => {
    const payload = {
      title: text,
      onClickDelete: callback,
    };
    openPopup(POPUP_TYPES.TRASH, payload);
  };
}

export default useDeleteItem;
