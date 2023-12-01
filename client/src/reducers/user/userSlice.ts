import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { editUser, refreshUser, signInUser } from "./userThunk";

interface UserType {
  nickname: string;
  id: string;
  avatar: string;
}

interface UserStateType {
  user: UserType;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  error?: any;
  editModalIsOpen: boolean;
  editStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
}

const initialState: UserStateType = {
  user: { nickname: "", id: "", avatar: "" },
  status: "",
  error: "",
  editModalIsOpen: false,
  editStatus: "",
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    userFetch: (state, action: PayloadAction<any>) => {
      state.user.nickname = action.payload.nickname;
      state.user.id = action.payload.id;
      state.user.avatar = action.payload.avatar;
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
  },
  extraReducers: (builder) => {
    /*Login */
    builder.addCase(signInUser.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      console.log(action);
      state.status = "SUCCESS";
      state.user.nickname = action.payload.nickname;
      state.user.id = action.payload.id;
      state.user.avatar = action.payload.avatar;
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
      console.log(action);
      state.status = "SUCCESS";
      state.user.nickname = action.payload.nickname;
      state.user.id = action.payload.id;
      state.user.avatar = action.payload.avatar;
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
      state.editModalIsOpen = false;
      state.user = action.payload;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.editStatus = "ERROR";
      state.error = action.error;
    });
  },
});

const { userFetch, editMoadlOpen, editModalClose, resetStatus } =
  userSlice.actions;

export const userActions = {
  userFetch,
  editMoadlOpen,
  editModalClose,
  resetStatus,
};

export default userSlice;
