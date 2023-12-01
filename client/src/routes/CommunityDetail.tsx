import React from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store";
import Container from "../components/Container";
import { postActions } from "../reducers/post/postSlice";
import PostEditModal from "../components/modals/PostEditModal";
import { detailPost } from "../reducers/post/postThunk";
import PostDeleteConfirm from "../components/confirms/PostDeleteConfirm";
import Loader from "../components/Loader";
import CheckAuthor from "../components/CheckAuthor";
import PostComment from "../components/comment/PostComment";
import PostCommentDeleteConfirm from "../components/confirms/PostCommentDeleteConfirm";
import HeartButton from "../components/HeartButton";

const CommunityDetail = () => {
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string };
  const postState = useAppSelector((state) => state.postSlice);
  const postId = postState.post?.authorId;
  const userState = useAppSelector((state) => state.userSlice);
  const userId = userState.user.id;

  const postEditAction = () => {
    dispatch(postActions.editModalOpen(postState.post));
  };

  const postDeleteAction = () => {
    dispatch(postActions.deleteConfirmOpen(postState.post));
  };

  React.useEffect(() => {
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
      <CheckAuthor
        authorId={postId!}
        userId={userId}
        editLabel="수정"
        editAction={postEditAction}
        deleteAction={postDeleteAction}
        deleteLabel="삭제"
      />
      <PostCommentDeleteConfirm />
      <div className="mt-52">
        <PostComment />
      </div>
      <HeartButton
        targetId={postState.post.id}
        isLike={postState.post.likeUsers.includes(userId)}
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
      </button> */}
    </Container>
  );
};

export default CommunityDetail;
