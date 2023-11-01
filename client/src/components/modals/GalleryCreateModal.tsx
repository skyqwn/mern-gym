import React, { useEffect, useMemo } from "react";
import Modal from "./Modal";
import { Input } from "../Inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import { useAppDispatch, useAppSelector } from "../../store";
import { galleryActions } from "../../reducers/gallery/gallerySlice";
import { Id, toast } from "react-toastify";
import FileInput from "../Inputs/FileInput";
import galleryThunk from "../../reducers/gallery/galleryThunk";

const GalleryCreateModal = () => {
  const dispatch = useAppDispatch();
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const toastRef = React.useRef<Id>();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      thumbnail: undefined,
      previews: [],
      files: [],
      title: "",
      desc: "",
    },
  });

  //미리보기
  const watchFiles = watch("files");
  const watchPreviews = watch("previews");

  useEffect(() => {
    const blobPreviews = watchFiles.map((file: File) =>
      URL.createObjectURL(file)
    );

    setValue("previews", blobPreviews);
  }, [watchFiles]);

  const onValid: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    delete data.previews;
    try {
      const fd = new FormData();
      for (var key in data) {
        if (key === "file") {
          fd.append(key, data[key][0]);
        } else {
          fd.append(key, data[key]);
        }
      }
      dispatch(galleryThunk.createGallery(fd));
    } catch (error) {
      console.log(error);
    }
    toastRef.current = toast.loading("로딩...");
  };
  // useEffect(() => {
  //   if (toastRef.current) {
  //     if (galleryState.status === "SUCCESS") {
  //       toast.update(toastRef.current, {
  //         type: "success",
  //         render: "생성 성공!",
  //         isLoading: false,
  //         autoClose: 2000,
  //       });
  //     }
  //     if (galleryState.status === "ERROR") {
  //       toast.update(toastRef.current, {
  //         type: "error",
  //         render: "생성 실패!",
  //         isLoading: false,
  //         autoClose: 2000,
  //       });
  //     }
  //   }
  // }, [galleryState.status]);

  const isLoading = useMemo(
    () => galleryState.status === "LOADING",
    [galleryState.status]
  );

  const onClose = () => {
    if (isLoading) {
      return;
    }
    dispatch(galleryActions.createModalOpen({}));
  };

  const deletePreview = (targetIndex: number) => {
    const filterFiles = watchFiles.filter(
      (__: any, index: number) => targetIndex !== index
    );
    setValue("files", filterFiles);

    const filterPreviews = watchPreviews.filter(
      (__: any, index: number) => targetIndex !== index
    );
    setValue("previews", filterPreviews);
  };

  const body = (
    <div className="space-y-5">
      <div className="flex gap-1">
        {watchPreviews.map((preview: string, targetIndex: number) => {
          return (
            <div className="relative">
              <img src={preview} className="w-20 h-20 rounded" />
              <div
                onClick={(e) => {
                  deletePreview(targetIndex);
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
      <Input name="title" control={control} errors={errors} label="제목" />
      <FileInput name="files" control={control} errors={errors} label="사진" />
      <TextArea name="desc" control={control} errors={errors} label="본문" />
    </div>
  );

  return (
    <Modal
      isOpen={galleryState.createModalIsOpen}
      onClose={onClose}
      label="갤러리 업로드"
      actionLabel="제출"
      onAction={handleSubmit(onValid)}
      body={body}
      secondActionLabel="취소"
      secondAction={() => {
        dispatch(galleryActions.creteModalClose({}));
      }}
    />
  );
};

export default GalleryCreateModal;
