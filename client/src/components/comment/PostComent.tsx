import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeComment } from "../../reducers/comment/commentThunk";
import { commentAcitons } from "../../reducers/comment/commentSlice";
import PostCommentDeleteConfirm from "../confirms/PostCommentDeleteConfirm";

const PostComent = () => {
  const dispatch = useAppDispatch();
  const commentState = useAppSelector((state) => state.commentSlice);
  console.log(commentState);
  const onDeleteConfirm = () => {
    dispatch(commentAcitons.deleteConfirmOpen({}));
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
  );
};

export default PostComent;
