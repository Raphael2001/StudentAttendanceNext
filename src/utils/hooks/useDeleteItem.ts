"use client";

import POPUP_TYPES from "constants/popup-types";
import usePopup from "./usePopup";

function useDeleteItem() {
  const openPopup = usePopup();
  function onDeleteItem(text: string, callback: (props?: Object) => void) {
    const payload = {
      title: text,
      onClickDelete: callback,
    };
    openPopup(POPUP_TYPES.TRASH, payload);
  }

  return onDeleteItem;
}

export default useDeleteItem;
