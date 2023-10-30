import React, { useEffect } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { postActions } from "../../reducers/post/postSlice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../Inputs/TextArea";
import { Input } from "../Inputs/Input";
import { getOptions } from "../../libs/util";
import Select from "../Inputs/Select";
import { Id, toast } from "react-toastify";
import { detailPost, editPost } from "../../reducers/post/postThunk";

const PostEditModal = (postProps: any) => {
  const dispatch = useAppDispatch();
  const options = getOptions();
  const toastRef = React.useRef<Id>();
  const postState = useAppSelector((state) => state.postSlice);
  // useEffect(() => {
  //   if (post.id) {
  //     reset({
  //       ...post,
  //     });
  //   }

  // }, [post]);
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
  useEffect(() => {
    if (toastRef.current) {
      if (postState.status === "SUCCESS") {
        toast.update(toastRef.current, {
          type: "success",
          render: "수정 성공!",
          isLoading: false,
        });
      }
    }
  }, [postState.status]);

  // const onClose = () => {
  //   dispatch(postActions.editModalClose);
  // };

  const onValid: SubmitHandler<FieldValues> = (data) => {
    toastRef.current = toast.loading("수정중...");
    dispatch(editPost(data));
    // onClose();
  };

  const isLoading = React.useMemo(
    () => postState.status === "LOADING",
    [postState.status]
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
