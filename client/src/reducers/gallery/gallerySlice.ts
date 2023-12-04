import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import galleryThunk from "./galleryThunk";

export interface GalleryTypes {
  author: { id: string; nickname: string; avatar: string };
  authorId: string;
  createAt: string;
  desc: string;
  id: string;
  images: string[];
  thumbnail: string;
  title: string;
  updateAt: string;
  likeUsers: string[];
  link?: string;
}

interface GalleryStateType {
  galleries: GalleryTypes[];
  totalPage: number;
  gallery?: GalleryTypes;
  createModalIsOpen: boolean;
  editModalIsOpen: boolean;
  deleteConfirmIsOpen: boolean;
  createStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  detailFetchStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  fetchStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  editStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  deleteStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  favStatus: "" | "LOADING" | "SUCCESS" | "ERROR";
  error?: any;
}

const initialState: GalleryStateType = {
  galleries: [],
  totalPage: 1,
  gallery: undefined,
  createModalIsOpen: false,
  editModalIsOpen: false,
  deleteConfirmIsOpen: false,
  createStatus: "",
  detailFetchStatus: "",
  fetchStatus: "",
  editStatus: "",
  deleteStatus: "",
  favStatus: "",
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
    resetStatus: (state, action) => {
      state.createStatus = "";
      state.editStatus = "";
      state.favStatus = "";
      state.fetchStatus = "";
    },
  },
  extraReducers: (builder) => {
    /* Gallery Create */
    builder.addCase(galleryThunk.createGallery.pending, (state, action) => {
      state.createStatus = "LOADING";
    });
    builder.addCase(galleryThunk.createGallery.fulfilled, (state, action) => {
      state.createStatus = "SUCCESS";
      state.galleries = [action.payload, ...state.galleries].slice(0, 2);
      state.createModalIsOpen = false;
    });
    builder.addCase(galleryThunk.createGallery.rejected, (state, action) => {
      state.createStatus = "ERROR";
      state.error = action.error;
    });

    /*Gallery Fetch */
    builder.addCase(galleryThunk.fetchGallery.pending, (state, action) => {
      state.fetchStatus = "LOADING";
    });
    builder.addCase(galleryThunk.fetchGallery.fulfilled, (state, action) => {
      state.fetchStatus = "SUCCESS";
      state.galleries = action.payload.galleries;
      state.totalPage = action.payload.totalPage;
    });
    builder.addCase(galleryThunk.fetchGallery.rejected, (state, action) => {
      state.fetchStatus = "ERROR";
      state.error = action.error;
    });

    /*Gallery Detail */
    builder.addCase(galleryThunk.detailGallery.pending, (state, action) => {
      state.detailFetchStatus = "LOADING";
    });
    builder.addCase(galleryThunk.detailGallery.fulfilled, (state, action) => {
      state.detailFetchStatus = "SUCCESS";
      state.gallery = action.payload;
    });
    builder.addCase(galleryThunk.detailGallery.rejected, (state, action) => {
      state.detailFetchStatus = "ERROR";
      state.error = action.error;
    });

    /*Gallery Update */
    builder.addCase(galleryThunk.editGallery.pending, (state, action) => {
      state.editStatus = "LOADING";
    });
    builder.addCase(galleryThunk.editGallery.fulfilled, (state, action) => {
      state.editStatus = "SUCCESS";
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
      state.editStatus = "ERROR";
      state.error = action.error;
    });

    /*Gallery Delete */
    builder.addCase(galleryThunk.removeGallery.pending, (state, action) => {
      state.deleteStatus = "LOADING";
    });
    builder.addCase(galleryThunk.removeGallery.fulfilled, (state, action) => {
      state.deleteStatus = "SUCCESS";
      state.galleries = state.galleries.filter(
        (gallery) => gallery.id !== action.payload.id
      );
      state.deleteConfirmIsOpen = false;
    });
    builder.addCase(galleryThunk.removeGallery.rejected, (state, action) => {
      state.deleteStatus = "ERROR";
      state.error = action.error;
    });

    /*Gallery Fav */
    builder.addCase(galleryThunk.favGallery.pending, (state, action) => {
      state.deleteStatus = "LOADING";
    });
    builder.addCase(galleryThunk.favGallery.fulfilled, (state, action) => {
      state.favStatus = "SUCCESS";
      //@ts-ignore
      state.galleries = state.galleries.map((gallery) => {
        if (gallery.id === action.payload.id) {
          gallery = action.payload;
        }
      });
      state.gallery = action.payload;
      state.deleteConfirmIsOpen = false;
    });
    builder.addCase(galleryThunk.favGallery.rejected, (state, action) => {
      state.deleteStatus = "ERROR";
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
  resetStatus,
} = gallerySlice.actions;

export const galleryActions = {
  createModalOpen,
  creteModalClose,
  editModalOpen,
  editModalClose,
  deleteConfirmOpen,
  deleteConfirmClose,
  resetStatus,
};

export default gallerySlice;
