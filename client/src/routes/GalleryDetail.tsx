import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { GalleryTypes, galleryActions } from "../reducers/gallery/gallerySlice";
import Container from "../components/Container";
import { detailGallery } from "../reducers/gallery/galleryThunk";
import GalleryEditModal from "../components/modals/GalleryEditModal";
import GalleryDeleteConfirm from "../components/confirms/GalleryDeleteConfirm";
import UserAvatar from "../components/UserAvatar";
import CheckAuthor from "../components/CheckAuthor";

const GalleryDetail = () => {
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string };
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const userState = useAppSelector((state) => state.userSlice);
  const userId = userState.user.id;
  const galleryId = galleryState.gallery?.authorId;
  const galleryEditAction = () => {
    dispatch(galleryActions.editModalOpen(galleryState.gallery));
  };
  const galleryDeleteAction = () => {
    dispatch(galleryActions.deleteConfirmOpen(galleryState.gallery));
  };
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
      <GalleryDeleteConfirm />
      <GalleryEditModal />

      <UserAvatar />
      <div>작성자: {galleryState.gallery?.author.nickname}</div>
      <div>작성일: {galleryState.gallery?.createAt}</div>
      <h3 className="font-bold">{galleryState.gallery?.title}</h3>
      <h1 className="text-red-500">{galleryState.gallery?.desc}</h1>
      <div className="flex mb-10 overflow-x-auto">
        {galleryState.gallery?.images.map((image: string, index: number) => (
          <div key={index} className="">
            <img className=" w-52 h-52" src={image} />
          </div>
        ))}
      </div>
      <CheckAuthor
        authorId={galleryId!}
        userId={userId}
        editLabel="수정"
        editAction={galleryEditAction}
        deleteAction={galleryDeleteAction}
        deleteLabel="삭제"
      />
    </Container>
  );
};

export default GalleryDetail;
