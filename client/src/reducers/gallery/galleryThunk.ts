import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { instance } from "../../api/apiconfig";

const createGallery = createAsyncThunk(
  "Gallery/createGallery",
  async (data: FieldValues) => {
    const res = await instance.post("/api/gallery", data);
    return res.data;
  }
);

export const fetchGallery = createAsyncThunk(
  "Gallery/fetchGallery",
  async () => {
    const res = await instance.get("/api/gallery");
    return res.data;
  }
);

export const detailGallery = createAsyncThunk(
  "Gallery/detail",
  async (id: string) => {
    if (id) {
      const res = await instance.get(`/api/gallery/${id}`);
      return res.data;
    }
  }
);

export default { createGallery, fetchGallery, detailGallery };
