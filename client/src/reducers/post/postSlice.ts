import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostType } from "../../types/postTypes";
import {
  createPost,
  detailPost,
  editPost,
  fetchPost,
  removePost,
} from "./postThunk";

interface PostStateType {
  posts: {
    fetchPost: PostType[];
    totalPage: number;
  };
  post: any;
  createModalIsOpen: boolean;
  editModalIsOpen: boolean;
  deleteConfirmIsOpen: boolean;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  error?: any;
}

const initialState: PostStateType = {
  posts: { fetchPost: [], totalPage: 1 },
  post: undefined,
  createModalIsOpen: false,
  editModalIsOpen: false,
  deleteConfirmIsOpen: false,
  status: "",
  error: "",
};

export const postSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    // handleCreateModal: (state, action: PayloadAction<boolean>) => {
    //   state.createModalIsOpen = action.payload;
    // },
    // handleEditModal: (state, action: PayloadAction<boolean>) => {
    //   state.createModalIsOpen = action.payload;
    // },
    createModalOpen: (state, action: PayloadAction<any>) => {
      // state.createModalIsOpen = true;
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
      state.post = "";
    },
    deleteConfirmOpen: (state, action: PayloadAction<any>) => {
      state.deleteConfirmIsOpen = true;
      state.post = action.payload;
    },
    deleteConfirmClose: (state, action: PayloadAction<any>) => {
      state.deleteConfirmIsOpen = false;
    },
  },
  extraReducers: (builder) => {
    /* Post Create */

    builder.addCase(createPost.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.posts.fetchPost = [action.payload, ...state.posts.fetchPost];
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
      state.posts.fetchPost = state.posts.fetchPost.map((post) => {
        if (post.id === action.payload.id) {
          post = action.payload;
        }
        return post;
      });
      state.post = action.payload;
      state.editModalIsOpen = false;
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
      state.posts.fetchPost = state.posts.fetchPost.filter(
        (post) => post.id !== action.payload.id
      );
      state.deleteConfirmIsOpen = false;
    });
    builder.addCase(removePost.rejected, (state, action) => {
      state.status = "ERROR";
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
} = postSlice.actions;

export const postActions = {
  createModalOpen,
  createModalClose,
  editModalOpen,
  editModalClose,
  deleteConfirmOpen,
  deleteConfirmClose,
};

export default postSlice;
