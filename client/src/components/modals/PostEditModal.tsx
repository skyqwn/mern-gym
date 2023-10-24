import React, { useEffect } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { postActions } from "../../reducers/postSlice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import { Input } from "../Inputs/Input";
import { getOptions } from "../../libs/util";
import Select from "../Inputs/Select";
import { Id, toast } from "react-toastify";
import { detailPost, editPost } from "../../reducers/createPost";
import { useParams } from "react-router-dom";

const PostEditModal = (postProps: any) => {
  const dispatch = useAppDispatch();
  const options = getOptions();
  const toastRef = React.useRef<Id>();
  const postState = useAppSelector((state) => state.postSlice);
  const post = useAppSelector((state) => state.postSlice.post);
  useEffect(() => {
    if (post.id) {
      reset({
        ...post,
      });
    }
  }, [post]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      desc: "",
      category: "",
    },
  });
  useEffect(() => {
    if (toastRef.current) {
      if (post.status === "SUCCESS") {
        toast.update(toastRef.current, {
          type: "success",
          render: "생성 성공!",
          isLoading: false,
        });
      }
    }
  }, []);

  const onClose = () => {
    dispatch(postActions.handleEditModal(false));
  };

  const onValid: SubmitHandler<FieldValues> = (data) => {
    toastRef.current = toast.loading("로딩...");
    dispatch(editPost(data));
    onClose();
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
      label="글수정"
      actionLabel="제출"
      onAction={handleSubmit(onValid)}
      body={body}
      secondActionLabel="취소"
      secondAction={onClose}
    />
  );
};

export default PostEditModal;
