import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../api/apiconfig";
import { FieldValues } from "react-hook-form";

export const createPost = createAsyncThunk(
  "Post/createPost",
  async (data: FieldValues) => {
    const res = await instance.post("/api/post", data);
    console.log(res.data);
    return res.data;
  }
);

export const fetchPost = createAsyncThunk("Post/fetchPost", async () => {
  const res = await instance.get("/api/post");
  return res.data;
});
