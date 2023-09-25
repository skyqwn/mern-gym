import React, { useContext, useState } from "react";
import { Input } from "../components/Inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { UserContext } from "../UserContext";
import { UserContextTypes } from "../types/userContextTypes";
import { instance } from "../api/apiconfig";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { auth, onSignin } = useContext(UserContext) as UserContextTypes;
  const navigate = useNavigate();
  console.log(auth);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      verifyPassword: "",
    },
  });
  const onValid: SubmitHandler<FieldValues> = (data) => {
    if (isLogin) {
      instance
        .post("/api/user/signin", data)
        .then((res) => {
          const {
            data: { accessToken, userEmail, userNickname },
          } = res;
          onSignin(accessToken, userEmail, userNickname);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      instance.post("/api/user/signup", data);
    }
  };
  return (
    <div className="mt-20 mx-auto max-w-md space-y-5 flex flex-col">
      <Input
        name="email"
        label="이메일"
        type="email"
        required
        errors={errors}
        control={control}
      />
      {!isLogin && (
        <Input
          name="nickname"
          label="닉네임"
          type="text"
          required
          errors={errors}
          control={control}
        />
      )}
      <Input
        name="password"
        label="비밀번호"
        type="password"
        required
        errors={errors}
        control={control}
      />
      {!isLogin && (
        <Input
          name="verifyPassword"
          label="비밀번호 확인"
          type="password"
          required
          errors={errors}
          control={control}
        />
      )}
      <Button
        onAction={handleSubmit(onValid)}
        label={isLogin ? "로그인" : "회원가입"}
      />
      <Button
        theme="secondary"
        onAction={() => {
          setIsLogin((prev) => !prev);
        }}
        label={
          !isLogin
            ? "아이디가 있으신가요? 로그인 하러 가기"
            : "아이디가 없으신가요? 회원가입 하러 가기  "
        }
      />
      <button>카카오톡로그인</button>
      <button>구글로그인</button>
    </div>
  );
};

export default Auth;
