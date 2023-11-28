import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  createComment,
  updatePostComment,
} from "../../reducers/comment/commentThunk";
import { commentAcitons } from "../../reducers/comment/commentSlice";
import PostCommentDeleteConfirm from "../confirms/PostCommentDeleteConfirm";
import TextArea from "../Inputs/TextArea";
import { Button } from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const PostComent = () => {
  const dispatch = useAppDispatch();
  const commentState = useAppSelector((state) => state.commentSlice);
  console.log(commentState);
  const postState = useAppSelector((state) => state.postSlice);
  const [edit, setEdit] = useState(false);
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
        ...commentState.comment,
        type: "post",
        postId: postState.post?.id,
      };
    }, [commentState.comment]),
  });

  const onValidCreate: SubmitHandler<FieldValues> = (data) => {
    dispatch(createComment(data));
  };
  const onValidEdit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    data.commentId = commentState.comment?.id;
    dispatch(updatePostComment(data));
  };

  return (
    <div>
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
                  setEdit(true);
                  dispatch(commentAcitons.editCommentInit(comment));
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
