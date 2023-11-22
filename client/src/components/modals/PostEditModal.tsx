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
import { editPost } from "../../reducers/post/postThunk";

const PostEditModal = () => {
  const dispatch = useAppDispatch();
  const options = getOptions();
  const postState = useAppSelector((state) => state.postSlice);

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
    const loadginToast = toast.loading("Loading...");
    try {
      dispatch(editPost(data));
      toast.success("수정 성공!", { id: loadginToast });
    } catch (error) {
      console.log(error);
      toast.error("수정 실패!", { id: loadginToast });
    }
    // onClose();
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
