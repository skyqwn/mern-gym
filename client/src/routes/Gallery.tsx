import React, { useEffect } from "react";
import Container from "../components/Container";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store";
import GalleryCreateModal from "../components/modals/GalleryCreateModal";
import { GalleryTypes, galleryActions } from "../reducers/gallery/gallerySlice";
import { Link } from "react-router-dom";
import { fetchGallery } from "../reducers/gallery/galleryThunk";

const Gallery = () => {
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGallery());
  }, []);
  return (
    <Container>
      <GalleryCreateModal />
      <Button
        label="갤러리 업로드"
        onAction={() => {
          dispatch(galleryActions.createModalOpen({}));
        }}
      />
      {galleryState.galleries.length > 0 &&
        galleryState.galleries.map((gallery: GalleryTypes) => (
          <Link key={gallery.id} to={`${gallery.id}`} state={{ gallery }}>
            <div key={gallery.id} className="text-red-500">
              {gallery.title}
            </div>
          </Link>
        ))}
    </Container>
  );
};

export default Gallery;
