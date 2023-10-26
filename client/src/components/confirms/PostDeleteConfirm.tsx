import React, { useRef } from "react";
import { removePost } from "../../reducers/createPost";
import { postActions } from "../../reducers/postSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import Confirm from "./Confirm";
import { Id, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostDeleteConfirm = () => {
  const dispatch = useAppDispatch();
  const postState = useAppSelector((state) => state.postSlice);
  const toastRef = useRef<Id>();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (toastRef.current) {
      if (postState.status === "SUCCESS") {
        toast.update(toastRef.current, {
          type: "success",
          render: "삭제 성공!",
          isLoading: false,
          autoClose: 2000,
        });
        navigate("/comunity");
      }
      if (postState.status === "ERROR") {
        toast.update(toastRef.current, {
          type: "error",
          render: "삭제 실패!",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  }, [postState.status]);

  const isLoading = React.useMemo(
    () => postState.status === "LOADING",
    [postState.status]
  );

  const onAction = () => {
    toastRef.current = toast.loading("삭제중...");
    if (postState.post.id) dispatch(removePost(postState.post.id));
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
