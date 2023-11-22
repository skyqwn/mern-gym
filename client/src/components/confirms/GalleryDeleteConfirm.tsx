import React, { useRef } from "react";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../store";
import Confirm from "./Confirm";
import { useNavigate } from "react-router-dom";
import { galleryActions } from "../../reducers/gallery/gallerySlice";
import { removeGallery } from "../../reducers/gallery/galleryThunk";

const GalleryDeleteConfirm = () => {
  const dispatch = useAppDispatch();
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const navigate = useNavigate();

  const isLoading = React.useMemo(
    () => galleryState.status === "LOADING",
    [galleryState.status]
  );

  const onAction = () => {
    const loadingToast = toast.loading("Loading...");
    try {
      if (galleryState.gallery) {
        if (galleryState.gallery.id) {
          dispatch(removeGallery(galleryState.gallery.id));
          toast.success("삭제 성공!", { id: loadingToast });
          navigate("/gallery");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("삭제 실패!", { id: loadingToast });
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
