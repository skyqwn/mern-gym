import React, { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { cls } from "../libs/util";

import { useAppDispatch, useAppSelector } from "../store";
import { fetchGalleryComment } from "../reducers/comment/commentThunk";
import { galleryActions } from "../reducers/gallery/gallerySlice";
import { detailGallery, favGallery } from "../reducers/gallery/galleryThunk";

import Container from "../components/Container";
import GalleryEditModal from "../components/modals/GalleryEditModal";
import UserAvatar from "../components/UserAvatar";
import CheckAuthor from "../components/CheckAuthor";
import Loader from "../components/Loader";
import GalleryComment from "../components/comment/GalleryComment";
import GalleryDeleteConfirm from "../components/confirms/GalleryDeleteConfirm";
import GalleryCommentDeleteConfirm from "../components/confirms/GalleryCommentDeleteConfirm";

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

  useEffect(() => {
    dispatch(detailGallery(params.id));
  }, []);

  useEffect(() => {
    dispatch(fetchGalleryComment(params.id));
  }, []);

  if (galleryState.detailFetchStatus === "LOADING") return <Loader />;
  if (!galleryState.gallery) return <div>Error!!</div>;
  return (
    <Container>
      <GalleryEditModal />
      <GalleryDeleteConfirm />

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
      <button
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
      </button>
      <GalleryComment />
      <GalleryCommentDeleteConfirm />
    </Container>
  );
};

export default GalleryDetail;
