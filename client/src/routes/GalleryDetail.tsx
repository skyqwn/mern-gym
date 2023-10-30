import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { GalleryTypes } from "../reducers/gallery/gallerySlice";
import Container from "../components/Container";
import { detailGallery } from "../reducers/gallery/galleryThunk";

const GalleryDetail = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string };
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const [data, setData] = React.useState<GalleryTypes | null>(null);
  console.log(data);

  useEffect(() => {
    if (location.state) {
      if (location.state.gallery) {
        setData(location.state.gallery);
      }
    } else {
      dispatch(detailGallery(params.id));
    }
  }, []);

  useEffect(() => {
    if (galleryState.gallery && galleryState.status === "SUCCESS") {
      setData(galleryState.gallery);
    }
  }, [galleryState.gallery]);

  return (
    <Container>
      <span>작성자: {data?.author.nickname}</span>
      <span>작성일: {data?.createAt}</span>
      <h3 className="font-bold">{data?.title}</h3>
      <h1 className="text-red-500">{data?.desc}</h1>
      <img src={`${data?.images[0]}`}></img>
    </Container>
  );
};

export default GalleryDetail;
