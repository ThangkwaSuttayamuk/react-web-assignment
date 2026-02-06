import formTableReducer from "@/features/form-table/formTable.slice";
import homeReducer from "@/features/home/home.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    formTable: formTableReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
