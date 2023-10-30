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

export const fetchPost = createAsyncThunk("Post/fetchPost", async () => {
  const res = await instance.get("/api/post");
  return res.data;
});

export const detailPost = createAsyncThunk(
  "Post/detail",
  async (id: string) => {
    if (id) {
      const res = await instance.get(`/api/post/${id}`);
      return res.data;
    }
  }
);

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
