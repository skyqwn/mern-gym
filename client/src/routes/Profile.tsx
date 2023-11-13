import React from "react";
import { Button } from "../components/Button";
import Container from "../components/Container";
import { useAppDispatch, useAppSelector } from "../store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Inputs/Input";
import { editUser } from "../reducers/user/userThunk";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userState = useAppSelector((state) => state.userSlice);
  console.log(userState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    values: React.useMemo(() => {
      return { ...userState.user };
    }, [userState.user]),
  });
  const onValid: SubmitHandler<FieldValues> = (data) => {
    dispatch(editUser(data));
    navigate("/home");
  };
  return (
    <Container>
      <div>profile</div>
      <div className="w-20 h-20 bg-red-300 rounded-full" />
      <div>닉네임</div>
      <Input name="nickname" control={control} errors={errors} label="닉네임" />
      <Button label="변경" onAction={handleSubmit(onValid)} />
    </Container>
  );
};

export default Profile;
