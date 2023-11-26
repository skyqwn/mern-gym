import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostCategoryType, PostType } from "../../types/postTypes";
import {
  createPost,
  detailPost,
  editPost,
  favPost,
  fetchPost,
  removePost,
} from "./postThunk";

interface PostStateType {
  fetchPost: PostType[];
  totalPage: number;
  post?: PostType;
  createModalIsOpen: boolean;
  editModalIsOpen: boolean;
  deleteConfirmIsOpen: boolean;
  createStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  detailFetchStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  fetchStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  editStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  deleteStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  favStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  error?: any;
}

const initialState: PostStateType = {
  fetchPost: [],
  totalPage: 1,
  post: undefined,
  createModalIsOpen: false,
  editModalIsOpen: false,
  deleteConfirmIsOpen: false,
  createStatus: "",
  detailFetchStatus: "",
  fetchStatus: "",
  editStatus: "",
  deleteStatus: "",
  favStatus: "",
  error: "",
};

export const postSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    createModalOpen: (state, action: PayloadAction<any>) => {
      state.createModalIsOpen = true;
    },
    createModalClose: (state, action: PayloadAction<any>) => {
      state.createModalIsOpen = false;
    },
    editModalOpen: (state, action: PayloadAction<any>) => {
      state.editModalIsOpen = true;
      state.post = action.payload;
    },
    editModalClose: (state, action: PayloadAction<any>) => {
      state.editModalIsOpen = false;
      // state.post = undefined;
    },
    deleteConfirmOpen: (state, action: PayloadAction<any>) => {
      state.deleteConfirmIsOpen = true;
      state.post = action.payload;
    },
    deleteConfirmClose: (state, action: PayloadAction<any>) => {
      state.deleteConfirmIsOpen = false;
    },
    resetStatus: (state, action) => {
      state.createStatus = "";
      state.editStatus = "";
      // state.deleteStatus = "";
      state.favStatus = "";
      state.fetchStatus = "";
    },
  },
  extraReducers: (builder) => {
    /* Post Create */

    builder.addCase(createPost.pending, (state, action) => {
      state.createStatus = "LOADING";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.createStatus = "SUCCESS";
      state.fetchPost = [action.payload, ...state.fetchPost].slice(0, 5);
      state.createModalIsOpen = false;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.createStatus = "ERROR";
      state.error = action.error;
    });

    /*Post Fetch */
    builder.addCase(fetchPost.pending, (state, action) => {
      state.fetchStatus = "LOADING";
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.fetchStatus = "SUCCESS";
      state.fetchPost = action.payload.fetchPost;
      state.totalPage = action.payload.totalPage;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.fetchStatus = "ERROR";
      state.error = action.error;
    });

    /*Post Detail */
    builder.addCase(detailPost.pending, (state, action) => {
      state.detailFetchStatus = "LOADING";
    });
    builder.addCase(detailPost.fulfilled, (state, action) => {
      state.detailFetchStatus = "SUCCESS";
      state.post = action.payload;
    });
    builder.addCase(detailPost.rejected, (state, action) => {
      state.detailFetchStatus = "ERROR";
      state.error = action.error;
    });

    /*Post Update */
    builder.addCase(editPost.pending, (state, action) => {
      state.editStatus = "LOADING";
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.editStatus = "SUCCESS";
      state.fetchPost = state.fetchPost.map((post) => {
        if (post.id === action.payload.id) {
          post = action.payload;
        }
        return post;
      });
      state.post = action.payload;
      state.editModalIsOpen = false;
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.editStatus = "ERROR";
      state.error = action.error;
    });

    /*Post Delete */
    builder.addCase(removePost.pending, (state, action) => {
      state.deleteStatus = "LOADING";
    });
    builder.addCase(removePost.fulfilled, (state, action) => {
      state.deleteStatus = "SUCCESS";
      state.fetchPost = state.fetchPost.filter(
        (post) => post.id !== action.payload.id
      );
      state.deleteConfirmIsOpen = false;
    });
    builder.addCase(removePost.rejected, (state, action) => {
      state.deleteStatus = "ERROR";
      state.error = action.error;
    });

    /*Post Fav */
    builder.addCase(favPost.pending, (state, action) => {
      state.favStatus = "LOADING";
    });
    builder.addCase(favPost.fulfilled, (state, action) => {
      state.favStatus = "SUCCESS";
      console.log(action.payload);
      state.fetchPost = state.fetchPost.map((post) => {
        if (post.id === action.payload.id) {
          post = action.payload;
        }
        return post;
      });
      state.post = action.payload;
      state.deleteConfirmIsOpen = false;
    });
    builder.addCase(favPost.rejected, (state, action) => {
      state.favStatus = "ERROR";
      state.error = action.error;
    });
  },
});

const {
  editModalOpen,
  editModalClose,
  createModalOpen,
  createModalClose,
  deleteConfirmOpen,
  deleteConfirmClose,
  resetStatus,
} = postSlice.actions;

export const postActions = {
  createModalOpen,
  createModalClose,
  editModalOpen,
  editModalClose,
  deleteConfirmOpen,
  deleteConfirmClose,
  resetStatus,
};

export default postSlice;
