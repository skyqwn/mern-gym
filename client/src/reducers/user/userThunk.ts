import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/apiconfig";
import { FieldValues } from "react-hook-form";

export const signInUser = createAsyncThunk(
  "User/signInUser",
  async (data: FieldValues) => {
    const res = await instance.post(`/api/user/signin`, data);
    // const { accessToken, avatar, id, nickname, refreshToken, userEmail } =
    //   res.data;
    // if (accessToken) {
    //   instance.defaults.headers.common[
    //     "Authorization"
    //   ] = `Bearer ${accessToken}`;
    // }
    return res.data;
  }
);
export const signUpUser = createAsyncThunk(
  "User/signUpUser",
  async (data: FieldValues) => {
    const res = await instance.post(`/api/user/signup`, data);
  }
);
export const refreshUser = createAsyncThunk("User/refreshUser", async () => {
  const res = await instance.post(`/api/user/refresh`);
  return res.data;
});

export const editUser = createAsyncThunk(
  "User/editUser",
  async (data: FieldValues) => {
    if (data.id) {
      const fd = new FormData();
      fd.append("id", data.id);
      fd.append("nickname", data.nickname);
      fd.append("file", data.file[0]);
      fd.append("previewImage", data.previewImage);
      console.log(Array.from(fd));
      const res = await instance.put(`/api/user/${data.id}`, fd);
      return res.data;
    }
  }
);

export const PostByUser = createAsyncThunk("User/PostByUser", async () => {
  const res = await instance.get(`/api/user/postByUser`);
  console.log(res);
  return res.data;
});

export const GalleryByUser = createAsyncThunk(
  "User/GalleryByUser",
  async () => {
    const res = await instance.get(`/api/user/GalleryByUser`);
    console.log(res);
    return res.data;
  }
);

export default { signInUser, editUser, refreshUser, GalleryByUser };
