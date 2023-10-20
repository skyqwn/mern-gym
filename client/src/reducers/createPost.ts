import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../api/apiconfig";

export const createPost = createAsyncThunk("Post/createPost", async (data) => {
  const res = await instance.post("/api/post", data);
  console.log(res.data);
  return res.data;
});
