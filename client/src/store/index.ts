import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import postSlice from "../reducers/postSlice";

export const store = configureStore({
  reducer: {
    postSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
