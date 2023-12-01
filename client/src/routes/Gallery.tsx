import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Container from "../components/Container";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store";
import GalleryCreateModal from "../components/modals/GalleryCreateModal";
import { galleryActions } from "../reducers/gallery/gallerySlice";
import { fetchGallery } from "../reducers/gallery/galleryThunk";
import Pagination from "../components/Pagination";
import GalleryBlock from "../components/block/GalleryBlock";

const Gallery = () => {
  const dispatch = useAppDispatch();
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = Number(searchParams.get("page"));
  const navigate = useNavigate();

  const page = React.useMemo(() => {
    if (queryPage) return queryPage;
    return 1;
  }, [queryPage]);

  React.useEffect(() => {
    if (page > 0) {
      dispatch(fetchGallery(page));
    } else {
      navigate("/gallery?page=1");
    }
  }, [page]);

  const modalOpen = () => {
    dispatch(galleryActions.createModalOpen({}));
  };

  const totalPage = galleryState.totalPage;
  return (
    <Container>
      <GalleryCreateModal />
      <button
        onClick={modalOpen}
        className="fixed bottom-24 right-5 shadow-xl  rounded-full w-14 h-14 flex items-center justify-center bg-red-400"
      >
        📸
      </button>
      <div className="flex space-x-10">
        {galleryState.galleries.length > 0 &&
          galleryState.galleries.map((gallery) => (
            <GalleryBlock gallery={gallery} />
          ))}
      </div>

      <Pagination currentPage={page} totalPage={totalPage} />
    </Container>
  );
};

export default Gallery;
