import React, { useRef } from "react";
import { removePost } from "../../reducers/post/postThunk";
import { useAppDispatch, useAppSelector } from "../../store";
import Confirm from "./Confirm";
import { Id, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { galleryActions } from "../../reducers/gallery/gallerySlice";
import { removeGallery } from "../../reducers/gallery/galleryThunk";

const GalleryDeleteConfirm = () => {
  const dispatch = useAppDispatch();
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const toastRef = useRef<Id>();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (toastRef.current) {
      if (galleryState.status === "SUCCESS") {
        toast.update(toastRef.current, {
          type: "success",
          render: "삭제 성공!",
          isLoading: false,
          autoClose: 2000,
        });
        navigate("/comunity");
      }
      if (galleryState.status === "ERROR") {
        toast.update(toastRef.current, {
          type: "error",
          render: "삭제 실패!",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  }, [galleryState.status]);

  const isLoading = React.useMemo(
    () => galleryState.status === "LOADING",
    [galleryState.status]
  );

  const onAction = () => {
    toastRef.current = toast.loading("삭제중...");
    if (galleryState.gallery) {
      if (galleryState.gallery.id)
        dispatch(removeGallery(galleryState.gallery.id));
    }
  };

  const onClose = () => {
    if (isLoading) return;
    dispatch(galleryActions.deleteConfirmClose({}));
  };

  return (
    <Confirm
      isOpen={galleryState.deleteConfirmIsOpen}
      label="정말 삭제하시겠습니까?"
      onAction={onAction}
      onClose={onClose}
      actionLabel="삭제"
      secondActionLabel="취소"
      secondAction={onClose}
    />
  );
};

export default GalleryDeleteConfirm;
