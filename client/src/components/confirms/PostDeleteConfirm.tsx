import React from "react";

import { removePost } from "../../reducers/post/postThunk";
import { postActions } from "../../reducers/post/postSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import Confirm from "./Confirm";
import useToast from "../../hooks/useToast";

const PostDeleteConfirm = () => {
  const dispatch = useAppDispatch();
  const postState = useAppSelector((state) => state.postSlice);
  const { toastStart } = useToast({
    status: postState.deleteStatus,
    errorMessage: "삭제실패",
    successMessage: "삭제성공",
    loadingMessage: "삭제중...",
  });
  const isLoading = React.useMemo(
    () => postState.deleteStatus === "LOADING",
    [postState.deleteStatus]
  );

  const onAction = () => {
    if (!postState.post) return;
    if (postState.post.id) {
      toastStart();
      dispatch(removePost(postState.post.id));
    }
  };

  const onClose = () => {
    if (isLoading) return;
    dispatch(postActions.deleteConfirmClose({}));
  };

  return (
    <Confirm
      isOpen={postState.deleteConfirmIsOpen}
      label="정말 삭제하시겠습니까?"
      onAction={onAction}
      onClose={onClose}
      actionLabel="삭제"
      secondActionLabel="취소"
    />
  );
};

export default PostDeleteConfirm;
