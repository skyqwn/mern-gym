import React, { useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../store";
import Confirm from "./Confirm";
import { useNavigate } from "react-router-dom";
import { galleryActions } from "../../reducers/gallery/gallerySlice";
import { removeGallery } from "../../reducers/gallery/galleryThunk";
import useToast from "../../hooks/useToast";

const GalleryDeleteConfirm = () => {
  const dispatch = useAppDispatch();
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const navigate = useNavigate();
  const { toastStart } = useToast({
    status: galleryState.deleteStatus,
    errorMessage: "삭제 실패!",
    successMessage: "삭제 성공!",
    loadingMessage: "삭제중...",
  });
  const isLoading = React.useMemo(
    () => galleryState.deleteStatus === "LOADING",
    [galleryState.deleteStatus]
  );

  const onAction = async () => {
    if (galleryState.gallery) {
      toastStart();
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
