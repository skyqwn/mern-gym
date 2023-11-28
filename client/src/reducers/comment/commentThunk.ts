import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { instance } from "../../api/apiconfig";

export const createComment = createAsyncThunk(
  "Comment/createComment",
  async (data: FieldValues) => {
    const res = await instance.post(`/api/comment`, data);
    return res.data;
  }
);

export const fetchPostComment = createAsyncThunk(
  "Comment/fetchComment",
  async (postId: string) => {
    if (postId) {
      const res = await instance.get(`/api/comment/post/${postId}`);
      return res.data;
    }
  }
);
export const fetchGalleryComment = createAsyncThunk(
  "Comment/fetchGalleryComment",
  async (galleryId: string) => {
    if (galleryId) {
      const res = await instance.get(`/api/comment/gallery/${galleryId}`);
      console.log(res.data);
      return res.data;
    }
  }
);

export const updatePostComment = createAsyncThunk(
  "Comment/updateComment",
  async (data: FieldValues) => {
    console.log(data);
    const res = await instance.post(
      `/api/comment/post/${data.id}/update`,
      data
    );
    return res.data;
  }
);

export const removeComment = createAsyncThunk(
  "Comment/deleteComment",
  async (id: string) => {
    if (id) {
      const res = await instance.post(`/api/comment/post/${id}/remove`);
      return res.data;
    }
  }
);
