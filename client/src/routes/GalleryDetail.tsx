import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store";
import { galleryActions } from "../reducers/gallery/gallerySlice";
import Container from "../components/Container";
import { detailGallery, favGallery } from "../reducers/gallery/galleryThunk";
import GalleryEditModal from "../components/modals/GalleryEditModal";
import GalleryDeleteConfirm from "../components/confirms/GalleryDeleteConfirm";
import UserAvatar from "../components/UserAvatar";
import CheckAuthor from "../components/CheckAuthor";
import { cls } from "../libs/util";
import { IoMdHeart } from "react-icons/io";
import Loader from "../components/Loader";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  createPostComment,
  fetchGalleryComment,
} from "../reducers/comment/commentThunk";
import GalleryComment from "../components/comment/GalleryComment";

const GalleryDetail = () => {
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string };
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const userState = useAppSelector((state) => state.userSlice);
  const userId = userState.user.id;
  const galleryId = galleryState.gallery?.authorId;
  const commentState = useAppSelector((state) => state.commentSlice);

  const onValid: SubmitHandler<FieldValues> = (data) => {
    dispatch(createPostComment(data));
  };

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
      {/* <div>
        <span>답변 {commentState.comments.length}</span>
        {commentState.comments &&
          commentState.comments.map((comment) => (
            <div className="flex justify-between items-center">
              <div key={comment.id} className="flex items-center gap-1">
                <PostCommentDeleteConfirm />
                <img
                  className="w-10 h-10 rounded-full"
                  src={comment.author.avatar}
                />
                <span>{comment.author.nickname}</span>
                <span>{comment.desc}</span>
              </div>
              <div className="flex gap-2">
                <span
                  onClick={() => {
                    console.log("수정");
                  }}
                >
                  수정
                </span>
                <span
                  onClick={() => {
                    dispatch(commentAcitons.deleteConfirmOpen(comment));
                  }}
                >
                  삭제
                </span>
              </div>
            </div>
          ))}
      </div>
      <TextArea name="desc" control={control} errors={errors} label="답변" />
      <Button label="댓글달기" onAction={handleSubmit(onValid)} /> */}
    </Container>
  );
};

export default GalleryDetail;
