import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createComment, fetchComment, removeComment } from "./commentThunk";

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
  editModalIsOpen: boolean;
  deleteConfirmIsOpen: boolean;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  editStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  deleteStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  error?: any;
}

const initialState: CommentStateType = {
  comments: [],
  comment: undefined,
  editModalIsOpen: false,
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
    editModalOpen: (state, action: PayloadAction<any>) => {
      state.editModalIsOpen = true;
      console.log(action.payload);
      if (state.comment) state.comment = action.payload;
    },
    editModalClose: (state, action) => {
      state.editModalIsOpen = false;
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
      state.comments = action.payload;
    });
    builder.addCase(fetchComment.rejected, (state, action) => {
      state.status = "ERROR";
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
  editModalOpen,
  editModalClose,
  deleteConfirmOpen,
  deleteConfirmClose,
  resetStatus,
} = commentSlice.actions;

export const commentAcitons = {
  editModalOpen,
  editModalClose,
  deleteConfirmOpen,
  deleteConfirmClose,
  resetStatus,
};

export default commentSlice;
