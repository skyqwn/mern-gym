import React from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { postActions } from "../../reducers/postSlice";
import { FieldValues, useForm } from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import { Input } from "../Inputs/Input";

const PostCreateModal = () => {
  const isOpen = useAppSelector((state) => state.postSlice.createModalIsOpen);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  const onClose = () => {
    dispatch(postActions.handleCreateModal(false));
  };

  const body = (
    <div className="space-y-5">
      <Input name="input" control={control} errors={errors} label="제목" />
      <TextArea name="desc" control={control} errors={errors} label="본문" />
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      label="글쓰기"
      actionLabel="제출"
      onAction={() => {}}
      body={body}
      secondActionLabel="취소"
      secondAction={() => {}}
    />
  );
};

export default PostCreateModal;
