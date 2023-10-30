import React, { useEffect } from "react";
import Modal from "./Modal";
import { Input } from "../Inputs/Input";
import {
  FieldValues,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import { useAppDispatch, useAppSelector } from "../../store";
import { galleryActions } from "../../reducers/gallery/gallerySlice";
import { Id, toast } from "react-toastify";
import FileInput from "../Inputs/FileInput";
import galleryThunk from "../../reducers/gallery/galleryThunk";

const defaultValues = {
  title: "",
  images: [],
  desc: "",
};

const GalleryCreateModal = () => {
  const dispatch = useAppDispatch();
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const toastRef = React.useRef<Id>();
  const [files, setFiles] = React.useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues,
    values: {},
  });

  //미리보기
  const watchImages = watch("images");
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

  const body = (
    <div className="space-y-5">
      <Input name="title" control={control} errors={errors} label="제목" />

      <div>
        {watchImages.map((file: any, i: any) => (
          <div key={i}>
            {file.name}
            <span
              onClick={() => {
                const filterFiles = watchImages.filter(
                  (file: any, index: any) => {
                    return index !== i;
                  }
                );
                setValue("images", filterFiles);
              }}
            >
              ❌
            </span>
          </div>
        ))}
      </div>
      <FileInput name="images" control={control} errors={errors} label="사진" />
      <TextArea name="desc" control={control} errors={errors} label="본문" />
    </div>
  );

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  const onValid: SubmitHandler<FieldValues> = (data) => {
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
    // toastRef.current = toast.loading("로딩...");
  };

  return (
    <Modal
      isOpen={galleryState.createModalIsOpen}
      onClose={() => {
        dispatch(galleryActions.creteModalClose({}));
      }}
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
