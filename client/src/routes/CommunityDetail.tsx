import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { Button } from "../components/Button";
import Container from "../components/Container";

import { postActions } from "../reducers/post/postSlice";
import PostEditModal from "../components/modals/PostEditModal";
import { detailPost, favPost } from "../reducers/post/postThunk";
import PostDeleteConfirm from "../components/confirms/PostDeleteConfirm";
import TextArea from "../components/Inputs/TextArea";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";

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
          dispatch(favPost(params.id));
        }}
        className={
          "p-3 rounded-md flex items-center justify-center hover:bg-gray-100 text-red-400 hover:text-red-500"
        }
      >
        <svg
          className="h-6 w-6 "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg> */}
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
