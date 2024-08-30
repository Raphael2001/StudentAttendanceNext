import { addPopup } from "redux-store/features/popupsSlice";
import { useAppDispatch } from "./useRedux";

function usePopup() {
  const dispatch = useAppDispatch();
  function openPopup(type: string, payload?: Object, priority?: number) {
    dispatch(
      addPopup({
        type,
        payload,
        priority,
      })
    );
  }

  return openPopup;
}

export default usePopup;
