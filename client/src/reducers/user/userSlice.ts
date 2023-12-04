import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  FetchUser,
  GalleryByUser,
  LikeByUser,
  PostByUser,
  editUser,
  refreshUser,
  signInUser,
} from "./userThunk";
import { PostType } from "../../types/postTypes";

interface UserType {
  nickname: string;
  id: string;
  avatar: string;
  galleries: any;
  posts: any;
}

interface UserStateType {
  user: UserType;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  error?: any;
  editModalIsOpen: boolean;
  editStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  likeByUser: any;
  likeByUserStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  fetchUserStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  fetchUser: UserType;
}

const initialState: UserStateType = {
  user: { nickname: "", id: "", avatar: "", galleries: [], posts: [] },
  status: "",
  error: "",
  editModalIsOpen: false,
  editStatus: "",
  likeByUser: [],
  likeByUserStatus: "",
  fetchUserStatus: "",
  fetchUser: { nickname: "", id: "", avatar: "", galleries: [], posts: [] },
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    userFetch: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      // state.user.nickname = action.payload.nickname;
      // state.user.id = action.payload.id;
      // state.user.avatar = action.payload.avatar;
      // state.user.galleries = action.payload.galleries;
      // state.user.posts = action.payload.posts;
    },
    editMoadlOpen: (state, action) => {
      state.editModalIsOpen = true;
    },
    editModalClose: (state, action) => {
      state.editModalIsOpen = false;
    },
    resetStatus: (state, action) => {
      state.editStatus = "";
    },
    deleteAvatar: (state, action) => {
      state.user.avatar = "";
    },
  },
  extraReducers: (builder) => {
    /*Login */
    builder.addCase(signInUser.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      // state.user.nickname = action.payload.nickname;
      // state.user.id = action.payload.id;
      // state.user.avatar = action.payload.avatar;
      // state.postByUser = action.payload.posts;
      // state.galleryByUser = action.payload.galleries;
      state.user = action.payload;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });
    /*Refresh */
    builder.addCase(refreshUser.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.status = "SUCCESS";
      // state.user.nickname = action.payload.nickname;
      // state.user.id = action.payload.id;
      // state.user.avatar = action.payload.avatar;
      // state.user.posts = action.payload.posts;
      // state.user.galleries = action.payload.galleries;
      state.user = action.payload;
    });
    builder.addCase(refreshUser.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });
    /*LogOut */
    // builder.addCase(signInUser.pending, (state, action) => {
    //   state.status = "LOADING";
    // });
    // builder.addCase(signInUser.fulfilled, (state, action) => {
    //   console.log(action);
    //   state.loggedIn = false;
    //   state.status = "SUCCESS";
    //   state.user.nickname = action.payload.nickname;
    //   state.user.id = action.payload.id;
    //   state.user.avatar = action.payload.avatar;
    // });
    // builder.addCase(signInUser.rejected, (state, action) => {
    //   state.status = "ERROR";
    //   state.error = action.error;
    // });

    /*Update */
    builder.addCase(editUser.pending, (state, action) => {
      state.editStatus = "LOADING";
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.editStatus = "SUCCESS";
      console.log(action.payload);
      state.editModalIsOpen = false;
      state.user = action.payload;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.editStatus = "ERROR";
      state.error = action.error;
    });

    /*LikeByUser Fetch */
    builder.addCase(LikeByUser.pending, (state, action) => {
      state.likeByUserStatus = "LOADING";
    });
    builder.addCase(LikeByUser.fulfilled, (state, action) => {
      state.likeByUserStatus = "SUCCESS";
      state.likeByUser = action.payload.slice(0, 3);
    });
    builder.addCase(LikeByUser.rejected, (state, action) => {
      state.likeByUserStatus = "ERROR";
      state.error = action.error;
    });
    /*User Fetch */
    builder.addCase(FetchUser.pending, (state, action) => {
      state.fetchUserStatus = "LOADING";
    });
    builder.addCase(FetchUser.fulfilled, (state, action) => {
      state.fetchUserStatus = "SUCCESS";
      state.fetchUser = action.payload;
    });
    builder.addCase(FetchUser.rejected, (state, action) => {
      state.fetchUserStatus = "ERROR";
      state.error = action.error;
    });
  },
});

const { userFetch, editMoadlOpen, editModalClose, resetStatus, deleteAvatar } =
  userSlice.actions;

export const userActions = {
  userFetch,
  editMoadlOpen,
  editModalClose,
  resetStatus,
  deleteAvatar,
};

export default userSlice;
