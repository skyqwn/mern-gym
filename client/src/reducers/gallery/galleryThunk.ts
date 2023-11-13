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

export const editGallery = createAsyncThunk(
  "Gallery/editGallery",
  async (data: FieldValues) => {
    console.log(data);
    if (data.id) {
      const fd = new FormData();
      fd.append("title", data.title);
      fd.append("desc", data.desc);
      fd.append("id", data.id);
      data.files.map((file: File) => {
        fd.append("files", file);
      });
      const imageLocations = new Array();
      data.images.map((image: string) => {
        imageLocations.push(image);
      });
      //@ts-ignore
      fd.append("images", imageLocations);
      const res = await instance.post(`/api/gallery/${data.id}/edit`, fd);
      return res.data;
    }
  }
);

export const removeGallery = createAsyncThunk(
  "Gallery/deleteGallery",
  async (id: string) => {
    if (id) {
      const res = await instance.post(`/api/gallery/${id}/remove`);
      return res.data;
    }
  }
);

export default { createGallery, fetchGallery, detailGallery, editGallery };