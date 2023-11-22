import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { Button } from "../components/Button";
import Container from "../components/Container";
import { IoMdHeart } from "react-icons/io";

import { postActions } from "../reducers/post/postSlice";
import PostEditModal from "../components/modals/PostEditModal";
import { detailPost, favPost } from "../reducers/post/postThunk";
import PostDeleteConfirm from "../components/confirms/PostDeleteConfirm";
import TextArea from "../components/Inputs/TextArea";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import { cls } from "../libs/util";

const CommunityDetail = () => {
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string };
  const postState = useAppSelector((state) => state.postSlice);
  console.log(postState);

  const userState = useAppSelector((state) => state.userSlice);
  const postId = postState.post?.authorId;
  const userId = userState.user.id;

  const {
    control,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    dispatch(detailPost(params.id));
  }, []);

  if (postState.detailFetchStatus === "LOADING") return <Loader />;
  if (!postState.post) return <div>Error!!</div>;
  return (
    <Container>
      <PostDeleteConfirm />
      <PostEditModal />
      <h3>{postState?.post?.category}</h3>
      <h1 className="text-4xl">{postState?.post?.title}</h1>
      <span>{postState.post?.desc}</span>
      {postId === userId && (
        <>
          <Button
            small
            label="수정"
            onAction={() => {
              dispatch(postActions.editModalOpen(postState.post));
            }}
          />
          <Button
            label="❌"
            onAction={() => {
              dispatch(postActions.deleteConfirmOpen(postState.post));
            }}
          />
        </>
      )}
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
          dispatch(favPost(postState.post?.id!));
        }}
        className={cls(
          "p-3 rounded-md flex items-center justify-center  ",
          postState.post.likeUsers.includes(userId)
            ? "text-red-500"
            : "text-slate-500"
        )}
      >
        <IoMdHeart className="w-20 h-20" />
      </button>

      <TextArea
        name="comments"
        control={control}
        errors={errors}
        label="댓글"
      />
    </Container>
  );
};

export default CommunityDetail;
