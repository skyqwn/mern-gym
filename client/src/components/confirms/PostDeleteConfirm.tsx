import React from "react";
import toast from "react-hot-toast";

import { removePost } from "../../reducers/post/postThunk";
import { postActions } from "../../reducers/post/postSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import Confirm from "./Confirm";
import { useNavigate } from "react-router-dom";

const PostDeleteConfirm = () => {
  const dispatch = useAppDispatch();
  const postState = useAppSelector((state) => state.postSlice);

  const navigate = useNavigate();
  // React.useEffect(() => {
  //   if (toastRef.current) {
  //     if (postState.deleteStatus === "SUCCESS") {
  //       toast.update(toastRef.current, {
  //         type: "success",
  //         render: "삭제 성공!",
  //         isLoading: false,
  //         autoClose: 2000,
  //       });
  //       navigate("/community?page=1");
  //     }
  //     if (postState.deleteStatus === "ERROR") {
  //       toast.update(toastRef.current, {
  //         type: "error",
  //         render: "삭제 실패!",
  //         isLoading: false,
  //         autoClose: 2000,
  //       });
  //     }
  //   }
  // }, [postState.deleteStatus]);

  const isLoading = React.useMemo(
    () => postState.deleteStatus === "LOADING",
    [postState.deleteStatus]
  );

  const onAction = () => {
    const loadingToast = toast.loading("Loading...");
    try {
      if (!postState.post) return;
      if (postState.post.id) {
        dispatch(removePost(postState.post.id));
        toast.success("삭제 성공!", { id: loadingToast });
        navigate("/community");
      }
    } catch (error) {
      console.log(error);
      toast.error("삭제 실패!", { id: loadingToast });
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
