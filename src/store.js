import { configureStore } from "@reduxjs/toolkit";
import { moduloApi } from "./services/index";

export const store = configureStore({
  reducer: {},
  [moduloApi.reducerPath]: moduloApi.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moduloApi.middleware),
});
