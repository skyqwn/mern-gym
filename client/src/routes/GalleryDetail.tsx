import React from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store";
import { fetchGalleryComment } from "../reducers/comment/commentThunk";
import { galleryActions } from "../reducers/gallery/gallerySlice";
import { detailGallery } from "../reducers/gallery/galleryThunk";

import Container from "../components/Container";
import GalleryEditModal from "../components/modals/GalleryEditModal";
import UserAvatar from "../components/UserAvatar";
import CheckAuthor from "../components/CheckAuthor";
import Loader from "../components/Loader";
import GalleryComment from "../components/comment/GalleryComment";
import GalleryDeleteConfirm from "../components/confirms/GalleryDeleteConfirm";
import GalleryCommentDeleteConfirm from "../components/confirms/GalleryCommentDeleteConfirm";
import HeartButton from "../components/HeartButton";

const GalleryDetail = () => {
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string };
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const userState = useAppSelector((state) => state.userSlice);
  const userId = userState.user.id;
  const galleryId = galleryState.gallery?.authorId;
  console.log(galleryState);

  const galleryEditAction = () => {
    dispatch(galleryActions.editModalOpen(galleryState.gallery));
  };

  const galleryDeleteAction = () => {
    dispatch(galleryActions.deleteConfirmOpen(galleryState.gallery));
  };

  React.useEffect(() => {
    dispatch(detailGallery(params.id));
  }, []);

  React.useEffect(() => {
    dispatch(fetchGalleryComment(params.id));
  }, []);

  if (galleryState.detailFetchStatus === "LOADING") return <Loader />;
  if (!galleryState.gallery) return <div>Error!!</div>;
  return (
    <Container>
      <GalleryEditModal />
      <GalleryDeleteConfirm />

      <img
        className="w-8 h-8 rounded-full"
        src={
          galleryState.gallery.author.avatar
            ? galleryState.gallery.author.avatar
            : "imgs/user.png"
        }
      />
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
      <HeartButton
        targetId={galleryState.gallery.id}
        isLike={galleryState.gallery.likeUsers.includes(userId)}
      />
      {/* <button
        onClick={async () => {
          // let dataUsers = [] as string[];
          // const likeUsers = [...postState.post?.likeUsers!];
          // const checkExists = likeUsers?.includes(userId);
          // if (checkExists) {
          //   const filterLikeUsers = likeUsers.filter((id) => id !== userId);
          //   dataUsers = filterLikeUsers;
          // } else {
          //   likeUsers?.push(userId);
          //   dataUsers = likeUsers;
          // }
          // dispatch(favPost({ id: postState.post?.id!, likeUsers: dataUsers }));
          dispatch(favGallery(galleryState.gallery?.id!));
        }}
        className={cls(
          "p-3 rounded-md flex items-center justify-center  ",
          galleryState.gallery.likeUsers.includes(userId)
            ? "text-red-500"
            : "text-slate-500"
        )}
      >
        <IoMdHeart className="w-20 h-20" />
      </button> */}
      <GalleryComment />
      <GalleryCommentDeleteConfirm />
    </Container>
  );
};

export default GalleryDetail;
