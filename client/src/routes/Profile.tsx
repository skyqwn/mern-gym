import React, { useContext, useEffect } from "react";
import { Button } from "../components/Button";
import Container from "../components/Container";
import { useAppDispatch, useAppSelector } from "../store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Inputs/Input";
import userThunk, { editUser } from "../reducers/user/userThunk";
import { useNavigate } from "react-router-dom";
import FileInput from "../components/Inputs/FileInput";
import UserAvatar from "../components/UserAvatar";
import { instance } from "../api/apiconfig";
import { userActions } from "../reducers/user/userSlice";
import { UserContext } from "../context/UserContext";
import { UserContextTypes } from "../types/userContextTypes";
import { Id, toast } from "react-toastify";

const Profile = () => {
  const userState = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toastRef = React.useRef<Id>();
  const { auth, onSignout } = useContext(UserContext) as UserContextTypes;
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

  useEffect(() => {
    if (toastRef.current) {
      if (userState.status === "SUCCESS") {
        toast.update(toastRef.current, {
          type: "success",
          render: "변경완료",
          isLoading: false,
          autoClose: 2000,
        });
      }
      if (userState.status === "ERROR") {
        toast.update(toastRef.current, {
          type: "error",
          render: "변경실패!",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  }, [userState.status]);

  const onValid: SubmitHandler<FieldValues> = (data) => {
    try {
      dispatch(userThunk.editUser(data));
    } catch (error) {
      console.log(error);
    }
    toastRef.current = toast.loading("로딩...");
  };

  return (
    <Container>
      <div className="flex items-center gap-3">
        {previewImage ? (
          <img className="w-20 h-20 rounded-full" src={previewImage} />
        ) : (
          <UserAvatar big />
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
      <button
        className="text-red-500 bg-slate-700 px-5 py-3 rounded font-bold"
        onClick={async () => {
          try {
            onSignout();
            navigate("/auth");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        로그아웃
      </button>
    </Container>
  );
};

export default Profile;
