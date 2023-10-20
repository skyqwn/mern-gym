import React, { useEffect } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { postActions } from "../../reducers/postSlice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import { Input } from "../Inputs/Input";
import { getOptions } from "../../libs/util";
import Select from "../Inputs/Select";
import { createPost } from "../../reducers/createPost";
import { Id, toast } from "react-toastify";

const PostEditModal = () => {
  const postState = useAppSelector((state) => state.postSlice);
  const dispatch = useAppDispatch();
  const options = getOptions();
  const toastRef = React.useRef<Id>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      desc: "",
      category: "FREE",
    },
  });

  useEffect(() => {
    if (toastRef.current) {
      if (postState.status === "SUCCESS") {
        toast.update(toastRef.current, {
          type: "success",
          render: "생성 성공!",
          isLoading: false,
        });
      }
    }
  }, []);

  const onClose = () => {
    dispatch(postActions.handleCreateModal(false));
  };

  const onValid: SubmitHandler<FieldValues> = (data) => {
    console.log(1);
    // toastRef.current = toast.loading("로딩...");
    // setTimeout(() => {
    //   dispatch(createPost(data));
    // }, 3000);
    // onClose();
  };

  const body = (
    <div className="space-y-5">
      <Select
        options={options.postCategoryOptions}
        name="category"
        control={control}
        errors={errors}
      />
      <Input name="title" control={control} errors={errors} label="제목" />
      <TextArea name="desc" control={control} errors={errors} label="본문" />
    </div>
  );

  return (
    <Modal
      isOpen={postState.createModalIsOpen}
      onClose={onClose}
      label="글쓰기"
      actionLabel="제출"
      onAction={handleSubmit(onValid)}
      body={body}
      secondActionLabel="취소"
      secondAction={onClose}
    />
  );
};

export default PostEditModal;
