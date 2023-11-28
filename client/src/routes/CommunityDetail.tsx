import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../store";
import Container from "../components/Container";
import { postActions } from "../reducers/post/postSlice";
import PostEditModal from "../components/modals/PostEditModal";
import { detailPost, favPost } from "../reducers/post/postThunk";
import PostDeleteConfirm from "../components/confirms/PostDeleteConfirm";
import Loader from "../components/Loader";
import { cls } from "../libs/util";
import CheckAuthor from "../components/CheckAuthor";
import PostComment from "../components/comment/PostComment";
import PostCommentDeleteConfirm from "../components/confirms/PostCommentDeleteConfirm";

const CommunityDetail = () => {
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string };
  const postState = useAppSelector((state) => state.postSlice);
  const userState = useAppSelector((state) => state.userSlice);
  const postId = postState.post?.authorId;
  const userId = userState.user.id;
  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm<FieldValues>({
  //   values: React.useMemo(() => {
  //     if (postState.post) {
  //       return {
  //         ...postState.post,
  //         type: "post",
  //       };
  //     }
  //   }, [postState.post]),
  // });
  const postEditAction = () => {
    dispatch(postActions.editModalOpen(postState.post));
  };

  const postDeleteAction = () => {
    dispatch(postActions.deleteConfirmOpen(postState.post));
  };

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
      <CheckAuthor
        authorId={postId!}
        userId={userId}
        editLabel="수정"
        editAction={postEditAction}
        deleteAction={postDeleteAction}
        deleteLabel="삭제"
      />
      <PostCommentDeleteConfirm />
      <PostComment />
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
    </Container>
  );
};

export default CommunityDetail;
