import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { AddPostDataType, PostType } from "../types/postTypes";
import { createPost, fetchPost } from "./createPost";

interface PostStateType {
  posts: PostType[];
  createModalIsOpen: boolean;
  handleEditModal: boolean;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  error: any;
}

const initialState: PostStateType = {
  posts: [],
  createModalIsOpen: false,
  handleEditModal: false,
  status: "",
  error: "",
};

export const postSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    handleCreateModal: (state, action: PayloadAction<boolean>) => {
      state.createModalIsOpen = action.payload;
    },
    handleEditModal: (state, action: PayloadAction<boolean>) => {
      state.createModalIsOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.posts = [action.payload, ...state.posts];
      state.createModalIsOpen = false;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });
    builder.addCase(fetchPost.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.posts = action.payload;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });
  },
});

const { handleCreateModal } = postSlice.actions;

export const postActions = {
  handleCreateModal,
};

export default postSlice;
