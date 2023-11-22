import React, { useEffect } from "react";
import toast from "react-hot-toast";

import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { postActions } from "../../reducers/post/postSlice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import { Input } from "../Inputs/Input";
import { getOptions } from "../../libs/util";
import Select from "../Inputs/Select";
import { createPost } from "../../reducers/post/postThunk";

const defaultValues = {
  title: "",
  desc: "",
  category: "FREE",
};

const PostCreateModal = () => {
  const postState = useAppSelector((state) => state.postSlice);
  const dispatch = useAppDispatch();
  const options = getOptions();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
  });

  const onValid: SubmitHandler<FieldValues> = (data) => {
    const loadingToast = toast.loading("Loading...");
    try {
      dispatch(createPost(data));
      toast.success("생성 성공!", { id: loadingToast });
    } catch (error) {
      console.log(error);
      toast.error("생성 실패!", { id: loadingToast });
    }
  };

  const isLoading = React.useMemo(
    () => postState.createStatus === "LOADING",
    [postState.createStatus]
  );

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
      onClose={() => {
        dispatch(postActions.createModalClose({}));
      }}
      label="글쓰기"
      actionLabel="제출"
      onAction={handleSubmit(onValid)}
      body={body}
      secondActionLabel="취소"
      secondAction={() => {
        dispatch(postActions.createModalClose({}));
      }}
      // disabled={isLoading}
    />
  );
};

export default PostCreateModal;
