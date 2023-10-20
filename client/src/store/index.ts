import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import postSlice from "../reducers/postSlice";

export const store = configureStore({
  reducer: {
    postSlice: postSlice.reducer,
  },
});

// export const useAppDispatch: () => typeof store.dispatch = useDispatch;

// export const useAppSelector: TypedUseSelectorHook<
//   ReturnType<typeof store.getState>
// > = useSelector;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
