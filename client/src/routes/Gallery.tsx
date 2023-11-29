import React, { useEffect, useMemo } from "react";
import {
  Link,
  Navigate,
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Container from "../components/Container";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store";
import GalleryCreateModal from "../components/modals/GalleryCreateModal";
import { galleryActions } from "../reducers/gallery/gallerySlice";
import { fetchGallery } from "../reducers/gallery/galleryThunk";
import Pagination from "../components/Pagination";

const Gallery = () => {
  const dispatch = useAppDispatch();
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = Number(searchParams.get("page"));
  const navigate = useNavigate();

  const page = useMemo(() => {
    if (queryPage) return queryPage;
    return 1;
  }, [queryPage]);

  useEffect(() => {
    if (page > 0) {
      dispatch(fetchGallery(page));
    } else {
      navigate("/gallery?page=1");
    }
  }, [page]);

  const totalPage = galleryState.totalPage;
  console.log(totalPage);
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
          galleryState.galleries.map((gallery) => (
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

      <Pagination currentPage={page} totalPage={totalPage} />
    </Container>
  );
};

export default Gallery;
