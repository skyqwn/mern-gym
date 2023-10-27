import React, { useEffect } from "react";
import Modal from "./Modal";
import { Input } from "../Inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import { useAppDispatch, useAppSelector } from "../../store";
import { galleryActions } from "../../reducers/gallerySlice";
import { Id, toast } from "react-toastify";

const defaultValues = {
  title: "",
  picture: "",
  desc: "",
};

const GalleryCreateModal = () => {
  const dispatch = useAppDispatch();
  const galleryState = useAppSelector((state) => state.gallerySlice);
  const toastRef = React.useRef<Id>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
  });

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
      <Input
        type="file"
        control={control}
        errors={errors}
        label="사진"
        name="picture"
      />
      <TextArea name="desc" control={control} errors={errors} label="본문" />
    </div>
  );

  const onValid: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    toastRef.current = toast.loading("로딩...");
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
