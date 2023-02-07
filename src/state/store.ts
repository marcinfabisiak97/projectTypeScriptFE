import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import dataReducer from "./slices/dataSlice";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    data: dataReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
