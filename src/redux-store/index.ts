import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";

const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // Removes all the immutable warnings
      serializableCheck: false,
    }),
});
export const makeStore = () => Store;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default Store;
