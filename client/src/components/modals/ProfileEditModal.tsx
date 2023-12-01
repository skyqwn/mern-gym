import React from "react";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdAddAPhoto } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../../store";
import useToast from "../../hooks/useToast";
import { Input } from "../Inputs/Input";
import FileInput from "../Inputs/FileInput";
import { userActions } from "../../reducers/user/userSlice";
import userThunk from "../../reducers/user/userThunk";
import UserAvatar from "../UserAvatar";

const ProfileEditModal = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userSlice);
  const { toastStart } = useToast({
    status: userState.editStatus,
    errorMessage: "수정실패",
    successMessage: "수정성공!",
    loadingMessage: "수정중...",
    type: "user",
  });

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    values: React.useMemo(() => {
      return { ...userState.user, previewImage: "", file: [] };
    }, [userState.user]),
  });

  const onValid: SubmitHandler<FieldValues> = (data) => {
    toastStart();
    dispatch(userThunk.editUser(data));
  };
  const isLoading = React.useMemo(
    () => userState.editStatus === "LOADING",
    [userState.editStatus]
  );

  const watchFile = watch("file");
  const previewImage = watch("previewImage");

  React.useEffect(() => {
    if (watchFile[0]) {
      const blobPreview = URL.createObjectURL(watchFile[0]);
      setValue("previewImage", blobPreview);
    }
  }, [watchFile]);

  const body = (
    <div className="space-y-5">
      <div className="relative flex items-center justify-center mt-28">
        {previewImage ? (
          <img className="w-40 h-40 rounded-full" src={previewImage} />
        ) : (
          <UserAvatar big />
        )}
      </div>
      <label htmlFor="avatar" className="">
        <div>
          <div className="flex items-center justify-center w-8 h-8 border hover:bg-gr ay-50 border-gray-300 rounded-full shadow-sm text-sm font-medium  text-[#a29bfe] bg-white cursor-pointer absolute top-12 left-12">
            <MdAddAPhoto />
          </div>
          <FileInput
            id="avatar"
            name="file"
            control={control}
            errors={errors}
            label=""
            onlyOne
          />
        </div>
      </label>
      <Input name="nickname" control={control} errors={errors} label="닉네임" />
    </div>
  );

  return (
    <Modal
      isOpen={userState.editModalIsOpen}
      onClose={() => {
        dispatch(userActions.editModalClose({}));
      }}
      label="유저 수정"
      actionLabel="수정"
      onAction={handleSubmit(onValid)}
      body={body}
      secondActionLabel="취소"
      secondAction={() => {
        dispatch(userActions.editModalClose({}));
      }}
      disabled={isLoading}
    />
  );
};

export default ProfileEditModal;
