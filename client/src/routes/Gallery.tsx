import React from "react";
import Container from "../components/Container";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store";
import GalleryCreateModal from "../components/modals/GalleryCreateModal";
import { galleryActions } from "../reducers/gallerySlice";

const Gallery = () => {
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const dispatch = useAppDispatch();
  console.log(galleryState);
  return (
    <Container>
      <GalleryCreateModal />
      <Button
        label="갤러리 업로드"
        onAction={() => {
          dispatch(galleryActions.createModalOpen({}));
        }}
      />
    </Container>
  );
};

export default Gallery;
