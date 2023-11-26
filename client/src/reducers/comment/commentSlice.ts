import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createComment, fetchComment } from "./commentThunk";

export interface CommentType {
  id: string;
  desc: string;
  author: {
    nickname: string;
    avatar: string;
  };
  postId?: string;
  galleryId?: string;
}

interface CommentStateType {
  comments: CommentType[];
  comment?: CommentType;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  error?: any;
}

const initialState: CommentStateType = {
  comments: [],
  comment: undefined,
  status: "",
  error: "",
};

export const commentSlice = createSlice({
  name: "Comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Comment Create */
    builder.addCase(createComment.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      console.log(action.payload);
      state.comments = [action.payload, ...state.comments];
      state.comment = action.payload;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });

    /*Comment Fetch */
    builder.addCase(fetchComment.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      console.log(action.payload);
      state.comments = action.payload;
    });
    builder.addCase(fetchComment.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });
  },
});

const {} = commentSlice.actions;

export const commentAcitons = {};

export default commentSlice;
