import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { GalleryTypes, galleryActions } from "../reducers/gallery/gallerySlice";
import Container from "../components/Container";
import { detailGallery } from "../reducers/gallery/galleryThunk";
import { Button } from "../components/Button";
import GalleryEditModal from "../components/modals/GalleryEditModal";

const GalleryDetail = () => {
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string };
  const galleryState = useAppSelector((state) => state.gallerySlice);
  // const [data, setData] = React.useState<GalleryTypes | null>(null);
  // useEffect(() => {
  //   if (location.state) {
  //     if (location.state.gallery) {
  //       location.state.gallery = "1";
  //       // dispatch(galleryActions.setGalleryDetail(location.state.gallery));
  //       // setData(location.state.gallery);
  //       console.log(location.state.gallery);
  //     }
  //   } else {
  //     dispatch(detailGallery(params.id));
  //   }
  // }, []);

  useEffect(() => {
    dispatch(detailGallery(params.id));
  }, []);

  // useEffect(() => {

  //   if (galleryState.gallery && galleryState.status === "SUCCESS") {
  //     dispatch(galleryActions.setGalleryDetail(location.state.gallery));
  //   }
  // }, [galleryState.gallery]);

  return (
    <Container>
      <GalleryEditModal />
      <Button
        label="수정"
        onAction={() => {
          dispatch(galleryActions.editModalOpen(galleryState.gallery));
        }}
      />
      <div>작성자: {galleryState.gallery?.author.nickname}</div>
      <div>작성일: {galleryState.gallery?.createAt}</div>
      <h3 className="font-bold">{galleryState.gallery?.title}</h3>
      <h1 className="text-red-500">{galleryState.gallery?.desc}</h1>
      <div className="grid grid-rows-4">
        {galleryState.gallery?.images.map((image: string, index: number) => (
          <div key={index}>
            <img className=" w-52 h-52" src={image} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default GalleryDetail;
