import React, { useState } from "react";
import { Input } from "../components/Inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onValid: SubmitHandler<FieldValues> = (data) => {
    axios.post("http://localhost:8000/api/user/signup", data);
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
    </div>
  );
};

export default Auth;
