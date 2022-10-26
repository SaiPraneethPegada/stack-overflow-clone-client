import { configureStore } from "@reduxjs/toolkit";
import QuestionReducer from "../features/QuestionSlice";
import AuthReducer from "../features/AuthSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const Store = configureStore({
  reducer: {
    questions: QuestionReducer,
    auth: AuthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(Store.dispatch);
