import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import galleryThunk from "./galleryThunk";

export interface GalleryTypes {
  author: { id: string; nickname: string };
  authorId: string;
  createAt: string;
  desc: string;
  id: string;
  images: string[];
  thumbnail: string;
  title: string;
  updateAt: string;
}

interface GalleryStateType {
  galleries: [];
  gallery?: GalleryTypes;
  createModalIsOpen: boolean;
  editModalIsOpen: boolean;
  deleteConfirmIsOpen: boolean;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  error?: any;
}

const initialState: GalleryStateType = {
  galleries: [],
  gallery: undefined,
  createModalIsOpen: false,
  editModalIsOpen: false,
  deleteConfirmIsOpen: false,
  status: "",
  error: "",
};

export const gallerySlice = createSlice({
  name: "Gallery",
  initialState,
  reducers: {
    createModalOpen: (state, action) => {
      state.createModalIsOpen = true;
    },
    creteModalClose: (state, action) => {
      state.createModalIsOpen = false;
    },
    editModalOpen: (state, action) => {
      state.editModalIsOpen = true;
    },
    editModalClose: (state, action) => {
      state.editModalIsOpen = true;
    },
    deleteConfirmOpen: (state, action) => {
      state.deleteConfirmIsOpen = true;
    },
    deleteConfirmClose: (state, action) => {
      state.deleteConfirmIsOpen = false;
    },
  },
  extraReducers: (builder) => {
    /* Gallery Create */

    builder.addCase(galleryThunk.createGallery.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(galleryThunk.createGallery.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.galleries = [action.payload, ...state.galleries] as any;
      state.createModalIsOpen = false;
    });
    builder.addCase(galleryThunk.createGallery.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });

    /*Gallery Fetch */
    builder.addCase(galleryThunk.fetchGallery.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(galleryThunk.fetchGallery.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.galleries = action.payload;
    });
    builder.addCase(galleryThunk.fetchGallery.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });

    /*Gallery Detail */
    builder.addCase(galleryThunk.detailGallery.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(galleryThunk.detailGallery.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.galleries = action.payload;
    });
    builder.addCase(galleryThunk.detailGallery.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });
  },
});

const {
  createModalOpen,
  creteModalClose,
  editModalOpen,
  editModalClose,
  deleteConfirmOpen,
  deleteConfirmClose,
} = gallerySlice.actions;

export const galleryActions = {
  createModalOpen,
  creteModalClose,
  editModalOpen,
  editModalClose,
  deleteConfirmOpen,
  deleteConfirmClose,
};

export default gallerySlice;
