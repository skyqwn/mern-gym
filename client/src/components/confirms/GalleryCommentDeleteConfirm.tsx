import React, { useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../store";
import Confirm from "./Confirm";
import useToast from "../../hooks/useToast";
import { removeGalleryComment } from "../../reducers/comment/commentThunk";
import { commentAcitons } from "../../reducers/comment/commentSlice";

const GalleryCommentDeleteConfirm = () => {
  const dispatch = useAppDispatch();
  const commentState = useAppSelector((state) => state.commentSlice);
  console.log(commentState.deleteTargetId);

  const { toastStart } = useToast({
    status: commentState.deleteStatus,
    errorMessage: "삭제 실패!",
    successMessage: "삭제 성공!",
    loadingMessage: "삭제중...",
    type: "comment",
  });
  const isLoading = React.useMemo(
    () => commentState.deleteStatus === "LOADING",
    [commentState.deleteStatus]
  );

  const onAction = async () => {
    toastStart();
    dispatch(removeGalleryComment(commentState.deleteTargetId));
    dispatch(commentAcitons.deleteConfirmClose({}));
  };

  const onClose = () => {
    if (isLoading) return;
    dispatch(commentAcitons.deleteConfirmClose({}));
  };

  return (
    <Confirm
      isOpen={commentState.deleteConfirmIsOpen}
      label="정말 삭제하시겠습니까?"
      onAction={onAction}
      onClose={onClose}
      actionLabel="삭제"
      secondActionLabel="취소"
      secondAction={onClose}
    />
  );
};

export default GalleryCommentDeleteConfirm;
