import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { AddPostDataType } from "../types/postTypes";
import { createPost } from "./createPost";

interface PostType {
  posts: [];
  createModalIsOpen: boolean;
  handleEditModal: boolean;
  loading: boolean;
  error: string;
}

const initialState: PostType = {
  posts: [],
  createModalIsOpen: false,
  handleEditModal: false,
  loading: false,
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
    addPost: (state, action: PayloadAction<AddPostDataType>) => {
      //@ts-ignore
      state.posts.push(action.payload);
    },
    // editPost:(state,action:PayloadAction<any>) => {
    //   const existPost = state.posts.find()
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = true;
    });
  },
});

const { handleCreateModal, addPost } = postSlice.actions;

export const postActions = {
  handleCreateModal,
  addPost,
};

export default postSlice;
