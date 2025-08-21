import { addPopup } from "redux-store/features/popupsSlice";
import { useAppDispatch } from "./useRedux";

function usePopup() {
  const dispatch = useAppDispatch();
  return (type: string, payload?: Object, priority?: number) => {
    dispatch(
      addPopup({
        type,
        payload,
        priority,
      }),
    );
  };
}

export default usePopup;
