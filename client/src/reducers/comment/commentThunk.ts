import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FieldValues } from "react-hook-form";
// import { axios } from "../../api/apiconfig";

export const createPostComment = createAsyncThunk(
  "Comment/createPostComment",
  async (data: FieldValues) => {
    const res = await axios.post(`/api/comment/post`, data);
    console.log(res.data);
    return res.data;
  }
);

export const fetchPostComment = createAsyncThunk(
  "Comment/fetchComment",
  async (postId: string) => {
    if (postId) {
      const res = await axios.get(`/api/comment/post/${postId}`);
      return res.data;
    }
  }
);

export const updatePostComment = createAsyncThunk(
  "Comment/updateComment",
  async (data: FieldValues) => {
    console.log(data);
    const res = await axios.post(`/api/comment/post/${data.id}/update`, data);
    return res.data;
  }
);

export const removeComment = createAsyncThunk(
  "Comment/deleteComment",
  async (id: string) => {
    if (id) {
      const res = await axios.post(`/api/comment/post/${id}/remove`);
      return res.data;
    }
  }
);

/* 갤러리 코멘트 */

export const createGalleryComment = createAsyncThunk(
  "Comment/createGalleryComment",
  async (data: FieldValues) => {
    const res = await axios.post(`/api/comment/gallery`, data);
    console.log(res.data);
    return res.data;
  }
);

export const fetchGalleryComment = createAsyncThunk(
  "Comment/fetchGalleryComment",
  async (galleryId: string) => {
    if (galleryId) {
      const res = await axios.get(`/api/comment/gallery/${galleryId}`);
      return res.data;
    }
  }
);

export const updateGalleryComment = createAsyncThunk(
  "Comment/updateGalleryComment",
  async (data: FieldValues) => {
    console.log(data);
    const res = await axios.post(
      `/api/comment/gallery/${data.id}/update`,
      data
    );
    return res.data;
  }
);

export const removeGalleryComment = createAsyncThunk(
  "Comment/removeGalleryComment",
  async (id: string) => {
    if (id) {
      const res = await axios.post(`/api/comment/gallery/${id}/remove`);
      return res.data;
    }
  }
);
