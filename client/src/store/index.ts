import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import postSlice from "../reducers/postSlice";
import gallerySlice from "../reducers/gallerySlice";

export const rootReducer = combineReducers({
  postSlice: postSlice.reducer,
  gallerySlice: gallerySlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// export const useAppDispatch: () => typeof store.dispatch = useDispatch;

// export const useAppSelector: TypedUseSelectorHook<
//   ReturnType<typeof store.getState>
// > = useSelector;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
