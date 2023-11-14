import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { editUser } from "./userThunk";

interface UserType {
  nickname: string;
  id: string;
  avatar: string;
}

interface UserStateType {
  user: UserType;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  error?: any;
}

const initialState: UserStateType = {
  user: { nickname: "", id: "", avatar: "" },
  status: "",
  error: "",
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    userFetch: (state, action: PayloadAction<UserType>) => {
      state.user.nickname = action.payload.nickname;
      state.user.id = action.payload.id;
      state.user.avatar = action.payload.avatar;
    },
  },
  extraReducers: (builder) => {
    /*Update */
    builder.addCase(editUser.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.user = action.payload;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });
  },
});

const { userFetch } = userSlice.actions;

export const userActions = { userFetch };

export default userSlice;
