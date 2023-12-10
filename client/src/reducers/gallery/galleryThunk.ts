import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FieldValues } from "react-hook-form";
// import { instance } from "../../api/apiconfig";

const createGallery = createAsyncThunk(
  "Gallery/createGallery",
  async (data: FieldValues) => {
    const res = await axios.post("/api/gallery", data);
    return res.data;
  }
);

export const fetchGallery = createAsyncThunk(
  "Gallery/fetchGallery",
  async (currentPage: any) => {
    const res = await axios.get(`/api/gallery?page=${currentPage}`);
    return res.data;
  }
);

export const detailGallery = createAsyncThunk(
  "Gallery/detail",
  async (id: string) => {
    if (id) {
      const res = await axios.get(`/api/gallery/${id}`);
      return res.data;
    }
  }
);

export const editGallery = createAsyncThunk(
  "Gallery/editGallery",
  async (data: FieldValues) => {
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
      const res = await axios.post(`/api/gallery/${data.id}/edit`, fd);
      return res.data;
    }
  }
);

export const removeGallery = createAsyncThunk(
  "Gallery/deleteGallery",
  async (id: string) => {
    if (id) {
      const res = await axios.post(`/api/gallery/${id}/remove`);
      return res.data;
    }
  }
);

export const favGallery = createAsyncThunk(
  "Gallery/favGallery",
  async (id: string) => {
    if (id) {
      const res = await axios.post(`/api/gallery/${id}/fav`);
      return res.data;
    }
  }
);

export default {
  createGallery,
  fetchGallery,
  detailGallery,
  editGallery,
  removeGallery,
  favGallery,
};
