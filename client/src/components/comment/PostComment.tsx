import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  createPostComment,
  fetchGalleryComment,
  fetchPostComment,
  updatePostComment,
} from "../../reducers/comment/commentThunk";
import { commentAcitons } from "../../reducers/comment/commentSlice";
import TextArea from "../Inputs/TextArea";
import { Button } from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Loader from "../Loader";

const PostComent = () => {
  const dispatch = useAppDispatch();
  const commentState = useAppSelector((state) => state.commentSlice);
  console.log(commentState);
  const postState = useAppSelector((state) => state.postSlice);
  const [edit, setEdit] = useState(false);
  const params = useParams() as { id: string };
  const onDeleteConfirm = () => {
    dispatch(commentAcitons.deleteConfirmOpen({}));
  };
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    values: React.useMemo(() => {
      return {
        ...commentState.postComment,
        type: "post",
        postId: postState.post?.id,
      };
    }, [commentState.postComment]),
  });

  useEffect(() => {
    dispatch(fetchPostComment(params.id));
  }, []);

  const onValidCreate: SubmitHandler<FieldValues> = (data) => {
    dispatch(createPostComment(data));
    setValue("desc", "");
  };
  const onValidEdit: SubmitHandler<FieldValues> = (data) => {
    data.commentId = commentState.postComment?.id;
    dispatch(updatePostComment(data));
    setEdit(false);
    setValue("desc", "");
  };
  if (commentState.postFetchCommentStatus === "LOADING") return <Loader />;
  return (
    <div>
      <span>답변 {commentState.postComments.length}</span>
      {commentState.postComments &&
        commentState.postComments.map((comment) => (
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
                  setEdit(true);
                  dispatch(commentAcitons.editCommentInit(comment));
                }}
              >
                수정
              </span>
              <span
                onClick={() => {
                  dispatch(commentAcitons.deleteConfirmOpen(comment.id));
                }}
              >
                삭제
              </span>
            </div>
          </div>
        ))}
      <TextArea name="desc" control={control} errors={errors} label="답변" />
      {!edit ? (
        <Button label="댓글달기" onAction={handleSubmit(onValidCreate)} />
      ) : (
        <Button label="수정하기" onAction={handleSubmit(onValidEdit)} />
      )}
      {edit && (
        <button
          onClick={() => {
            setEdit(false);
            setValue("desc", "");
          }}
        >
          수정취소
        </button>
      )}
      {/* <Button label="댓글달기" onAction={handleSubmit(onValid)} /> */}
    </div>
  );
};

export default PostComent;
