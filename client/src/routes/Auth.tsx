import React, { useContext, useState } from "react";
import { Input } from "../components/Inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { UserContextTypes } from "../types/userContextTypes";
import { instance } from "../api/apiconfig";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getGoogleUrl } from "../utils/getGoogleUrl";
import userErrorHandler from "../hooks/userErrorHandler";
import { getKakaoUrl } from "../utils/getKakaoUrl";
import { toast } from "react-toastify";
import { useAppDispatch } from "../store";
import { userActions } from "../reducers/user/userSlice";

const Auth = () => {
  const errorHandler = userErrorHandler();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const { auth, onSignin } = useContext(UserContext) as UserContextTypes;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let from = ((location.state as any)?.from?.pathname as string) || "/";

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
            data: { accessToken, userEmail, nickname, id, avatar },
          } = res;
          onSignin(accessToken, userEmail, nickname);
          dispatch(userActions.userFetch({ nickname, id, avatar }));
          toast.success("로그인 성공");
          navigate("/");
        })
        .catch((error) => {
          errorHandler(error);
          console.log(error);
        });
    } else {
      instance.post("/api/user/signup", data);
      setIsLogin(true);
      toast.success("회원가입 성공");
    }
  };

  if (auth?.loggedIn) {
    return <Navigate to={from} />;
  }

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
      <Link to={getGoogleUrl(from)}>
        <Button label="구글로 로그인" theme="tertiary" onAction={() => {}} />
      </Link>
      <Link to={getKakaoUrl(from)}>
        <img src="imgs/kakao_login_medium_narrow.png" />
      </Link>
      <button>카카오톡로그인</button>
    </div>
  );
};

export default Auth;
