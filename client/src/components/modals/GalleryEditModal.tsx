import React, { useEffect } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import { Input } from "../Inputs/Input";
import { galleryActions } from "../../reducers/gallery/gallerySlice";
import galleryThunk from "../../reducers/gallery/galleryThunk";
import FileInput from "../Inputs/FileInput";
import useToast from "../../hooks/useToast";

const GalleryEditModal = () => {
  const dispatch = useAppDispatch();
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const { toastStart } = useToast({
    status: galleryState.editStatus,
    errorMessage: "수정 실패!",
    loadingMessage: "로딩중...",
    successMessage: "수정 성공!",
    type: "gallery",
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    values: React.useMemo(() => {
      if (galleryState.gallery) {
        return {
          ...galleryState.gallery,
          files: [],
          previewFiles: [],
          id: galleryState.gallery.id,
        };
      }
      return { files: [], previewFiles: [], images: [] };
    }, [galleryState.gallery]),
  });
  const oldImages = watch("images");
  const watchFiles = watch("files");
  const watchPreviewFiles = watch("previewFiles");

  useEffect(() => {
    if (watchFiles) {
      const blobPreviews = watchFiles.map((file: File) =>
        URL.createObjectURL(file)
      );

      setValue("previewFiles", blobPreviews);
    }
  }, [watchFiles]);

  const onValid: SubmitHandler<FieldValues> = (data) => {
    toastStart();
    dispatch(galleryThunk.editGallery(data));
  };

  const deleteOldPreview = (targetIndex: number) => {
    const filterOldImages = oldImages.filter(
      (__: any, index: number) => targetIndex !== index
    );
    console.log(filterOldImages);
    setValue("images", filterOldImages);
  };

  const deleteNewPreview = (targetIndex: number) => {
    const filterNewImages = watchFiles.filter(
      (__: any, index: number) => targetIndex !== index
    );
    setValue("files", filterNewImages);
  };

  const isLoading = React.useMemo(
    () => galleryState.editStatus === "LOADING",
    [galleryState.editStatus]
  );

  const body = (
    <div className="space-y-5 ">
      <div className="overflow-x-auto">
        <div className=" w-fit">
          <div className="flex gap-8  ">
            <label htmlFor="picture">
              <div className="flex items-center justify-center w-20 h-20  border hover:bg-gr ay-50 border-gray-300 rounded-md shadow-sm text-sm font-medium  text-gray-700">
                사진추가
              </div>
              <FileInput
                id="picture"
                name="files"
                control={control}
                errors={errors}
                label=""
              />
            </label>
            {oldImages.map((preview: string, targetIndex: number) => {
              return (
                <div key={targetIndex} className="relative  w-20">
                  <img src={preview} className="w-20 h-20 rounded" />
                  <div
                    onClick={(e) => {
                      deleteOldPreview(targetIndex);
                      URL.revokeObjectURL(preview);
                    }}
                    className="absolute top-0 right-0 cursor-pointer text-xs"
                  >
                    ❌
                  </div>
                </div>
              );
            })}
            {watchPreviewFiles.map((preview: string, targetIndex: number) => {
              return (
                <div key={targetIndex} className="relative  w-20">
                  <img src={preview} className="w-20 h-20 rounded" />
                  <div
                    onClick={(e) => {
                      deleteNewPreview(targetIndex);
                      URL.revokeObjectURL(preview);
                    }}
                    className="absolute top-0 right-0 cursor-pointer text-xs"
                  >
                    ❌
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Input name="title" control={control} errors={errors} label="제목" />

      <TextArea name="desc" control={control} errors={errors} label="본문" />
    </div>
  );

  return (
    <Modal
      isOpen={galleryState.editModalIsOpen}
      onClose={() => {
        dispatch(galleryActions.editModalClose({}));
      }}
      label="글수정"
      actionLabel="수정"
      onAction={handleSubmit(onValid)}
      body={body}
      secondActionLabel="취소"
      secondAction={() => {
        dispatch(galleryActions.editModalClose({}));
      }}
      disabled={isLoading}
    />
  );
};

export default GalleryEditModal;
