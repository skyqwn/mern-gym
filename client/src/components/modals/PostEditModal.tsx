import React from "react";

import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { postActions } from "../../reducers/post/postSlice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import { Input } from "../Inputs/Input";
import { getOptions } from "../../libs/util";
import Select from "../Inputs/Select";
import { editPost } from "../../reducers/post/postThunk";
import useToast from "../../hooks/useToast";

const PostEditModal = () => {
  const dispatch = useAppDispatch();
  const options = getOptions();
  const postState = useAppSelector((state) => state.postSlice);
  const { toastStart } = useToast({
    status: postState.editStatus,
    errorMessage: "수정실패",
    successMessage: "수정성공!",
    loadingMessage: "수정중...",
    type: "post",
  });
  console.log(postState);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      desc: "",
      category: "",
    },
    values: React.useMemo(() => {
      return { ...postState.post };
    }, [postState.post]),
  });

  const onValid: SubmitHandler<FieldValues> = (data) => {
    toastStart();
    dispatch(editPost(data));
  };

  const isLoading = React.useMemo(
    () => postState.editStatus === "LOADING",
    [postState.editStatus]
  );

  const body = (
    <div className="space-y-5">
      <Select
        options={options.postCategoryOptions}
        name="category"
        control={control}
        errors={errors}
        disabled={isLoading}
      />
      <Input
        name="title"
        control={control}
        errors={errors}
        label="제목"
        disabled={isLoading}
      />
      <TextArea
        name="desc"
        control={control}
        errors={errors}
        label="본문"
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      isOpen={postState.editModalIsOpen}
      onClose={() => {
        dispatch(postActions.editModalClose({}));
      }}
      label="글수정"
      actionLabel="수정"
      onAction={handleSubmit(onValid)}
      body={body}
      secondActionLabel="취소"
      secondAction={() => {
        dispatch(postActions.editModalClose({}));
      }}
      disabled={isLoading}
    />
  );
};

export default PostEditModal;
