import React, { useEffect } from "react";
import { Button } from "../components/Button";
import Container from "../components/Container";
import { useAppDispatch, useAppSelector } from "../store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Inputs/Input";
import userThunk, { editUser } from "../reducers/user/userThunk";
import { useNavigate } from "react-router-dom";
import FileInput from "../components/Inputs/FileInput";

const Profile = () => {
  const userState = useAppSelector((state) => state.userSlice);
  console.log(userState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const watchFile = watch("file");
  const previewImage = watch("previewImage");
  useEffect(() => {
    if (watchFile[0]) {
      const blobPreview = URL.createObjectURL(watchFile[0]);
      setValue("previewImage", blobPreview);
    }
  }, [watchFile]);

  const onValid: SubmitHandler<FieldValues> = (data) => {
    dispatch(userThunk.editUser(data));
    navigate("/home");
  };

  // 처음엔 노유저
  // 1. 서버에 저장된 사진이 있어 근데 사진 변경할라고 프리뷰를 눌르면 어케 프리뷰 보여줌???
  return (
    <Container>
      <div className="flex items-center gap-3">
        {previewImage ? (
          <img className="w-20 h-20 rounded-full" src={previewImage} />
        ) : userState.user.avatar ? (
          <img className="w-20 h-20 rounded-full" src={userState.user.avatar} />
        ) : (
          <img className="w-20 h-20" src="imgs/user.png" />
        )}
        <label htmlFor="avatar">
          <div className="flex items-center justify-center w-20 h-20  border hover:bg-gr ay-50 border-gray-300 rounded-md shadow-sm text-sm font-medium  text-gray-700">
            사진변경
          </div>
          <FileInput
            id="avatar"
            name="file"
            control={control}
            errors={errors}
            label=""
            onlyOne
          />
        </label>
      </div>
      <Input name="nickname" control={control} errors={errors} label="닉네임" />
      <Button label="변경" onAction={handleSubmit(onValid)} />
    </Container>
  );
};

export default Profile;
