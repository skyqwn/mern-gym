import React, { useEffect } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { postActions } from "../../reducers/post/postSlice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import { Input } from "../Inputs/Input";
import { getOptions } from "../../libs/util";
import Select from "../Inputs/Select";
import { createPost } from "../../reducers/post/postThunk";
import { toast, Id } from "react-toastify";

const defaultValues = {
  title: "",
  desc: "",
  category: "FREE",
};

const PostCreateModal = () => {
  const postState = useAppSelector((state) => state.postSlice);
  const dispatch = useAppDispatch();
  const toastRef = React.useRef<Id>();
  const options = getOptions();

  useEffect(() => {
    if (toastRef.current) {
      if (postState.createStatus === "SUCCESS") {
        toast.update(toastRef.current, {
          type: "success",
          render: "생성 성공!",
          isLoading: false,
          autoClose: 2000,
        });
      }
      if (postState.createStatus === "ERROR") {
        toast.update(toastRef.current, {
          type: "error",
          render: "생성 실패!",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  }, [postState.createStatus]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
  });

  const onValid: SubmitHandler<FieldValues> = (data) => {
    toastRef.current = toast.loading("로딩...");
    dispatch(createPost(data));
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
