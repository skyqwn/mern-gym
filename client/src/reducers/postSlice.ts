import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PostType {
  createModalIsOpen: boolean;
}

const initialState: PostType = {
  createModalIsOpen: false,
};

export const postSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    handleCreateModal: (state, action: PayloadAction<boolean>) => {
      state.createModalIsOpen = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

const { handleCreateModal } = postSlice.actions;

export const postActions = {
  handleCreateModal,
};

export default postSlice.reducer;
