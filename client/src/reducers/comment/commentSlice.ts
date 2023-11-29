import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createGalleryComment,
  createPostComment,
  fetchGalleryComment,
  fetchPostComment,
  removeComment,
  removeGalleryComment,
  updateGalleryComment,
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
  postComments: CommentType[];
  postComment?: CommentType;
  galleryComments: CommentType[];
  galleryComment?: CommentType;
  // editModalIsOpen: boolean;
  deleteConfirmIsOpen: boolean;
  deleteTargetId: string;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  postCreateCommentStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  postFetchCommentStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  postEditCommentStatus: "" | "LOADING" | "SUCCESS" | "ERROR";

  galleryCreateCommentStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  galleryFetchCommentStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  galleryEditCommentStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  editStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  deleteStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  error?: any;
}

const initialState: CommentStateType = {
  postComments: [],
  postComment: undefined,
  galleryComments: [],
  galleryComment: undefined,
  // editModalIsOpen: false,
  deleteConfirmIsOpen: false,
  deleteTargetId: "",
  status: "",
  postFetchCommentStatus: "",
  postCreateCommentStatus: "",
  postEditCommentStatus: "",

  galleryCreateCommentStatus: "",
  galleryFetchCommentStatus: "",
  galleryEditCommentStatus: "",
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
      state.postComment = action.payload;
      // if (state.comment) state.comment = action.payload;
    },
    editGalleryCommentInit: (state, action: PayloadAction<any>) => {
      // state.editModalIsOpen = true;
      state.galleryComment = action.payload;
      // if (state.comment) state.comment = action.payload;
    },
    editCommentCancel: (state, action) => {
      // state.editModalIsOpen = false;
      state = { ...state, postComment: action.payload };
    },
    deleteConfirmOpen: (state, action: PayloadAction<any>) => {
      state.deleteConfirmIsOpen = true;
      state.deleteTargetId = action.payload;
    },
    deleteGalleryCommnetConfirmOpen: (state, action: PayloadAction<any>) => {
      state.deleteConfirmIsOpen = true;
      state.deleteTargetId = action.payload;
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
    /* PostComment Create */
    builder.addCase(createPostComment.pending, (state, action) => {
      state.postCreateCommentStatus = "LOADING";
    });
    builder.addCase(createPostComment.fulfilled, (state, action) => {
      state.postCreateCommentStatus = "SUCCESS";
      console.log(action.payload);
      state.postComments = [action.payload, ...state.postComments];
      console.log(state.postComments);
      state.postComment = undefined;
    });
    builder.addCase(createPostComment.rejected, (state, action) => {
      state.postCreateCommentStatus = "ERROR";
      state.error = action.error;
    });

    /*PostComment Fetch */
    builder.addCase(fetchPostComment.pending, (state, action) => {
      state.postFetchCommentStatus = "LOADING";
    });
    builder.addCase(fetchPostComment.fulfilled, (state, action) => {
      state.postFetchCommentStatus = "SUCCESS";
      state.postComments = action.payload;
    });
    builder.addCase(fetchPostComment.rejected, (state, action) => {
      state.postFetchCommentStatus = "ERROR";
      state.error = action.error;
    });

    /*PostComment Update */
    builder.addCase(updatePostComment.pending, (state, action) => {
      state.postEditCommentStatus = "LOADING";
    });
    builder.addCase(updatePostComment.fulfilled, (state, action) => {
      state.postEditCommentStatus = "SUCCESS";
      state.postComments = state.postComments.map((comment) => {
        if (comment.id === action.payload.id) {
          comment = action.payload;
        }
        return comment;
      });
      state.postComment = undefined;
      // state.deleteConfirmIsOpen = false;
    });
    builder.addCase(updatePostComment.rejected, (state, action) => {
      state.postEditCommentStatus = "ERROR";
      state.error = action.error;
    });

    /*PostComment Delete */
    builder.addCase(removeComment.pending, (state, action) => {
      state.deleteStatus = "LOADING";
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.deleteStatus = "SUCCESS";
      state.postComments = state.postComments.filter(
        (comment) => comment.id !== action.payload.id
      );
      // state.deleteConfirmIsOpen = false;
    });
    builder.addCase(removeComment.rejected, (state, action) => {
      state.deleteStatus = "ERROR";
      state.error = action.error;
    });

    /* GalleryComment Create */
    builder.addCase(createGalleryComment.pending, (state, action) => {
      state.galleryCreateCommentStatus = "LOADING";
    });
    builder.addCase(createGalleryComment.fulfilled, (state, action) => {
      state.galleryCreateCommentStatus = "SUCCESS";
      console.log(action.payload);
      state.galleryComments = [action.payload, ...state.galleryComments];
      console.log(state.galleryComments);
      state.galleryComment = undefined;
    });
    builder.addCase(createGalleryComment.rejected, (state, action) => {
      state.galleryCreateCommentStatus = "ERROR";
      state.error = action.error;
    });

    /*GalleryComment Fetch */
    builder.addCase(fetchGalleryComment.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(fetchGalleryComment.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.galleryComments = action.payload;
    });
    builder.addCase(fetchGalleryComment.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });

    /*GalleryComment Update */
    builder.addCase(updateGalleryComment.pending, (state, action) => {
      state.galleryEditCommentStatus = "LOADING";
    });
    builder.addCase(updateGalleryComment.fulfilled, (state, action) => {
      state.galleryEditCommentStatus = "SUCCESS";
      state.galleryComments = state.galleryComments.map((comment) => {
        if (comment.id === action.payload.id) {
          comment = action.payload;
        }
        return comment;
      });
      state.galleryComment = undefined;
      // state.deleteConfirmIsOpen = false;
    });
    builder.addCase(updateGalleryComment.rejected, (state, action) => {
      state.galleryEditCommentStatus = "ERROR";
      state.error = action.error;
    });

    /*GalleyComment Delete */
    builder.addCase(removeGalleryComment.pending, (state, action) => {
      state.deleteStatus = "LOADING";
    });
    builder.addCase(removeGalleryComment.fulfilled, (state, action) => {
      state.deleteStatus = "SUCCESS";
      state.galleryComments = state.galleryComments.filter(
        (comment) => comment.id !== action.payload.id
      );
      state.galleryComment = undefined;
      // state.deleteConfirmIsOpen = false;
    });
    builder.addCase(removeGalleryComment.rejected, (state, action) => {
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
  editGalleryCommentInit,
  deleteGalleryCommnetConfirmOpen,
} = commentSlice.actions;

export const commentAcitons = {
  editCommentInit,
  editCommentCancel,
  deleteConfirmOpen,
  deleteConfirmClose,
  resetStatus,
  editGalleryCommentInit,
  deleteGalleryCommnetConfirmOpen,
};

export default commentSlice;
