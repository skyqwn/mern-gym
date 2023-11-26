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

export const fetchComment = createAsyncThunk(
  "Comment/fetchComment",
  async (postId: string) => {
    if (postId) {
      const res = await instance.get(`/api/comment/${postId}`);
      return res.data;
    }
  }
);

export const removeComment = createAsyncThunk(
  "Comment/deleteComment",
  async (id: string) => {
    if (id) {
      const res = await instance.post(`/api/comment/${id}/remove`);
      return res.data;
    }
  }
);
