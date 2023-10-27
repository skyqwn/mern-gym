import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GalleryStateType {
  galleries: [];
  gallery: any;
  createModalIsOpen: boolean;
  editModalIsOpen: boolean;
  deleteConfirmIsOpen: boolean;
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  error?: any;
}

const initialState: GalleryStateType = {
  galleries: [],
  gallery: "",
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
  extraReducers: (builder) => {},
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
