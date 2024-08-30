import { combineSlices } from "@reduxjs/toolkit";
import { apiQueueSlice } from "redux-store/features/apiQueueSlice";
import { apiValidationSlice } from "redux-store/features/apiValidationSlice";
import { burgerSlice } from "redux-store/features/burgerStateSlice";
import { deviceSlice } from "redux-store/features/deviceSlice";
import { initAppSlice } from "redux-store/features/initAppSlice";
import { initSlice } from "redux-store/features/initSlice";
import { loaderSlice } from "redux-store/features/loaderSlice";
import { notificationsSlice } from "redux-store/features/notificationsSlice";
import { popupsSlice } from "redux-store/features/popupsSlice";
import { tokensSlice } from "redux-store/features/tokensSlice";
import { userDataSlice } from "redux-store/features/userDataSlice";

const rootReducer = combineSlices(
  initSlice,
  apiQueueSlice,
  burgerSlice,
  deviceSlice,
  loaderSlice,
  notificationsSlice,
  popupsSlice,
  tokensSlice,
  userDataSlice,
  initAppSlice,
  apiValidationSlice
);

export default rootReducer;
