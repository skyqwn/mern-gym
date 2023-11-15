import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store";
import GalleryCreateModal from "../components/modals/GalleryCreateModal";
import { GalleryTypes, galleryActions } from "../reducers/gallery/gallerySlice";
import { Link } from "react-router-dom";
import { fetchGallery } from "../reducers/gallery/galleryThunk";
import Pagination from "../components/Pagination";

const Gallery = () => {
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGallery());
  }, []);
  const [totalItems, setTotalItems] = useState(0);

  return (
    <Container>
      <GalleryCreateModal />
      <Button
        label="갤러리 업로드"
        onAction={() => {
          dispatch(galleryActions.createModalOpen({}));
        }}
      />
      <div className="flex space-x-10">
        {galleryState.galleries.length > 0 &&
          galleryState.galleries.map((gallery: GalleryTypes) => (
            <Link key={gallery.id} to={`${gallery.id}`} state={{ gallery }}>
              <div key={gallery.id} className="text-red-500">
                <div>
                  <img className="w-20 h-52" src={gallery.thumbnail} />
                </div>
                <div>{gallery.title}</div>
              </div>
            </Link>
          ))}
      </div>
      {/* <Pagination totalItems={galleryState.} pageCount={5} itemCountPerPage={50} /> */}
    </Container>
  );
};

export default Gallery;
