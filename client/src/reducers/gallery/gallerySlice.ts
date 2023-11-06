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
  galleries: GalleryTypes[];
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
    editModalOpen: (state, action: PayloadAction<any>) => {
      state.editModalIsOpen = true;
      state.gallery = action.payload;
    },
    editModalClose: (state, action) => {
      state.editModalIsOpen = false;
      state = { ...state, gallery: action.payload };
    },
    deleteConfirmOpen: (state, action: PayloadAction<any>) => {
      state.deleteConfirmIsOpen = true;
      state.gallery = action.payload;
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
      console.log(action.payload);
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
      state.gallery = action.payload;
    });
    builder.addCase(galleryThunk.detailGallery.rejected, (state, action) => {
      state.status = "ERROR";
      state.error = action.error;
    });
    /*Gallery Update */
    builder.addCase(galleryThunk.editGallery.pending, (state, action) => {
      state.status = "LOADING";
    });
    builder.addCase(galleryThunk.editGallery.fulfilled, (state, action) => {
      state.status = "SUCCESS";
      state.galleries = state.galleries.map((gallery) => {
        if (gallery.id === action.payload.id) {
          gallery = action.payload;
        }
        return gallery;
      });
      state.gallery = action.payload;
      state.editModalIsOpen = false;
    });
    builder.addCase(galleryThunk.editGallery.rejected, (state, action) => {
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
