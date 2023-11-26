import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdHeart } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../store";
import { Button } from "../components/Button";
import Container from "../components/Container";
import { postActions } from "../reducers/post/postSlice";
import PostEditModal from "../components/modals/PostEditModal";
import { detailPost, favPost } from "../reducers/post/postThunk";
import PostDeleteConfirm from "../components/confirms/PostDeleteConfirm";
import TextArea from "../components/Inputs/TextArea";
import Loader from "../components/Loader";
import { cls } from "../libs/util";
import CheckAuthor from "../components/CheckAuthor";
import { createComment, fetchComment } from "../reducers/comment/commentThunk";

const CommunityDetail = () => {
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string };
  const postState = useAppSelector((state) => state.postSlice);
  const userState = useAppSelector((state) => state.userSlice);
  const commentState = useAppSelector((state) => state.commentSlice);
  console.log(commentState);
  const postId = postState.post?.authorId;
  const userId = userState.user.id;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    values: React.useMemo(() => {
      if (postState.post) {
        return {
          ...postState.post,
          type: "post",
        };
      }
    }, [postState.post]),
  });
  const postEditAction = () => {
    dispatch(postActions.editModalOpen(postState.post));
  };

  const postDeleteAction = () => {
    dispatch(postActions.deleteConfirmOpen(postState.post));
  };

  const onValid: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    dispatch(createComment(data));
  };

  useEffect(() => {
    dispatch(detailPost(params.id));
  }, []);

  useEffect(() => {
    dispatch(fetchComment(params.id));
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

      {commentState.comments &&
        commentState.comments.map((comment) => (
          <div className="flex justify-between items-center">
            <div key={comment.id} className="flex items-center gap-1">
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
                  console.log("삭제");
                }}
              >
                삭제
              </span>
            </div>
          </div>
        ))}
      {/* <span>답변 {commentState.comments.length}</span> */}
      <form onSubmit={handleSubmit(onValid)}>
        <TextArea name="desc" control={control} errors={errors} label="답변" />
        <button
          onClick={() => {
            handleSubmit(onValid);
          }}
        >
          댓글 달기
        </button>
      </form>
    </Container>
  );
};

export default CommunityDetail;
