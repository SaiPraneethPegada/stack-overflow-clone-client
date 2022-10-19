import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { questionApi } from "../services/Question";

export const Store = configureStore({
  reducer: {
    [questionApi.reducerPath]: questionApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(questionApi.middleware),
});

setupListeners(Store.dispatch);
