import React from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { postActions } from "../../reducers/postSlice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import { Input } from "../Inputs/Input";
import { getOptions } from "../../libs/util";
import Select from "../Inputs/Select";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createPost } from "../../reducers/createPost";

const defaultValues = {
  title: "",
  desc: "",
  category: "FREE",
};

const PostCreateModal = () => {
  const isOpen = useAppSelector((state) => state.postSlice.createModalIsOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const options = getOptions();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
  });

  const onClose = () => {
    dispatch(postActions.handleCreateModal(false));
  };

  const onValid: SubmitHandler<FieldValues> = (data) => {
    // dispatch(
    //   postActions.addPost({
    //     category: data.category,
    //     desc: data.desc,
    //     title: data.title,
    //     id: uuidv4(),
    //   })
    // );
    //@ts-ignore
    dispatch(createPost(data));
    // dispatch(postActions.addPost({ ...data, id: uuidv4() }));
    navigate(`/`);
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
      isOpen={isOpen}
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

export default PostCreateModal;
