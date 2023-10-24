import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { PostType } from "../types/postTypes";
import {
  createPost,
  detailPost,
  editPost,
  fetchPost,
  removePost,
} from "./createPost";

interface PostStateType {
  posts: PostType[];
  post: any;
  createModalIsOpen: boolean;
  editModalIsOpen: boolean;
  handleEditModal: boolean;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  error: any;
}

const initialState: PostStateType = {
  posts: [],
  post: "",
  createModalIsOpen: false,
  editModalIsOpen: false,
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
    /* Post Create */

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

    /*Post Fetch */
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

    /*Post Detail */
    builder.addCase(detailPost.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(detailPost.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.post = action.payload;
    });
    builder.addCase(detailPost.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });

    /*Post Update */
    builder.addCase(editPost.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.post = action.payload;
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });

    /*Post Delete */
    builder.addCase(removePost.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(removePost.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      // state.post = action.payload;
    });
    builder.addCase(removePost.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });
  },
});

const { handleCreateModal, handleEditModal } = postSlice.actions;

export const postActions = {
  handleCreateModal,
  handleEditModal,
};

export default postSlice;
