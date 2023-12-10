import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/apiconfig";
import { FieldValues } from "react-hook-form";

export const createPost = createAsyncThunk(
  "Post/createPost",
  async (data: FieldValues) => {
    const res = await instance.post("/api/post", data);
    return res.data;
  }
);

export const fetchPost = createAsyncThunk(
  "Post/fetchPost",
  async (currentPage: number) => {
    const res = await instance.get(`/api/post?page=${currentPage}`);
    // console.log(res.data);
    // const { posts, totalPage } = res.data;

    return res.data;
  }
);

export const detailPost = createAsyncThunk(
  "Post/detail",
  async (id: string) => {
    if (id) {
      const res = await instance.get(`/api/post/${id}`);
      return res.data;
    }
  }
);
export const editPostAPI = async (data: any) => {
  return await instance.post(`/api/post/${data.id}/edit`, data);
};

export const editPost = createAsyncThunk(
  "Post/editPost",
  async (data: FieldValues) => {
    if (data.id) {
      const res = await instance.post(`/api/post/${data.id}/edit`, data);
      return res.data;
    }
  }
);

export const removePost = createAsyncThunk(
  "Post/deletePost",
  async (id: string) => {
    if (id) {
      const res = await instance.post(`/api/post/${id}/remove`);
      return res.data;
    }
  }
);

export const favPost = createAsyncThunk("Post/favPost", async (id: string) => {
  if (id) {
    const res = await instance.post(`/api/post/${id}/fav`);
    return res.data;
  }
});
// export const favPost = createAsyncThunk("Post/favPost", async (id: string) => {
//   if (id) {
//     const res = await instance.post(`/api/post/${id}/fav`);
//     return res.data;
//   }
// });
