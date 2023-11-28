import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  fetchGalleryComment,
  fetchPostComment,
  removeComment,
  updatePostComment,
} from "./commentThunk";

export interface CommentType {
  id: string;
  desc: string;
  author: {
    id: string;
    nickname: string;
    avatar: string;
  };
  postId?: string;
  galleryId?: string;
}

interface CommentStateType {
  comments: CommentType[];
  comment?: CommentType;
  // editModalIsOpen: boolean;
  deleteConfirmIsOpen: boolean;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  editStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  deleteStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  error?: any;
}

const initialState: CommentStateType = {
  comments: [],
  comment: undefined,
  // editModalIsOpen: false,
  deleteConfirmIsOpen: false,
  status: "",
  deleteStatus: "",
  editStatus: "",
  error: "",
};

export const commentSlice = createSlice({
  name: "Comment",
  initialState,
  reducers: {
    editCommentInit: (state, action: PayloadAction<any>) => {
      // state.editModalIsOpen = true;
      console.log(action.payload);
      state.comment = action.payload;
      // if (state.comment) state.comment = action.payload;
    },
    editCommentCancel: (state, action) => {
      // state.editModalIsOpen = false;
      state = { ...state, comment: action.payload };
    },
    deleteConfirmOpen: (state, action: PayloadAction<any>) => {
      state.deleteConfirmIsOpen = true;
      state.comment = action.payload;
    },
    deleteConfirmClose: (state, action) => {
      state.deleteConfirmIsOpen = false;
    },
    resetStatus: (state, action) => {
      state.deleteStatus = "";
      state.editStatus = "";
    },
  },
  extraReducers: (builder) => {
    /* Comment Create */
    builder.addCase(createComment.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.comments = [action.payload, ...state.comments];
      state.comment = action.payload;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });

    /*PostComment Fetch */
    builder.addCase(fetchPostComment.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(fetchPostComment.fulfilled, (state, action) => {
      console.log(action.payload);
      state.status = "SUCCESS";
      state.comments = action.payload;
    });
    builder.addCase(fetchPostComment.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });

    /*GalleryComment Fetch */
    builder.addCase(fetchGalleryComment.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(fetchGalleryComment.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.comments = action.payload;
    });
    builder.addCase(fetchGalleryComment.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });

    /*Comment Update */
    builder.addCase(updatePostComment.pending, (state, action) => {
      state.editStatus = "LOADING";
    });
    builder.addCase(updatePostComment.fulfilled, (state, action) => {
      state.editStatus = "SUCCESS";
      state.comments = state.comments.map((comment) => {
        if (comment.id === action.payload.id) {
          comment = action.payload;
        }
        return comment;
      });
      state.comment = action.payload;
      // state.deleteConfirmIsOpen = false;
    });
    builder.addCase(updatePostComment.rejected, (state, action) => {
      state.editStatus = "ERROR";
      state.error = action.error;
    });

    /*Comment Delete */
    builder.addCase(removeComment.pending, (state, action) => {
      state.deleteStatus = "LOADING";
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.deleteStatus = "SUCCESS";
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload.id
      );
      // state.deleteConfirmIsOpen = false;
    });
    builder.addCase(removeComment.rejected, (state, action) => {
      state.deleteStatus = "ERROR";
      state.error = action.error;
    });
  },
});

const {
  editCommentInit,
  editCommentCancel,
  deleteConfirmOpen,
  deleteConfirmClose,
  resetStatus,
} = commentSlice.actions;

export const commentAcitons = {
  editCommentInit,
  editCommentCancel,
  deleteConfirmOpen,
  deleteConfirmClose,
  resetStatus,
};

export default commentSlice;
