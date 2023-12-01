import React from "react";
import { TbLogout } from "react-icons/tb";

import { Button } from "../components/Button";
import Container from "../components/Container";
import { useAppDispatch, useAppSelector } from "../store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { UserContextTypes } from "../types/userContextTypes";
import { userActions } from "../reducers/user/userSlice";
import ProfileEditModal from "../components/modals/ProfileEditModal";

const Profile = () => {
  const userState = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { auth, onSignout } = React.useContext(UserContext) as UserContextTypes;

  const signOutHandler = async () => {
    try {
      onSignout();
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  const profileEditModalOpen = () => {
    dispatch(userActions.editMoadlOpen({}));
  };

  return (
    <Container>
      <ProfileEditModal />
      <div className="p-10 flex-col gap-10 mt-10 border border-gray-300 rounded-md ">
        <div className="flex justify-center">
          <img className="w-40 h-40 rounded-full" src={userState.user.avatar} />
        </div>
        <div className="flex justify-center">{userState.user.nickname}</div>
        <div
          className="flex justify-center border bg-red-200 cursor-pointer hover:bg-red-300"
          onClick={profileEditModalOpen}
        >
          정보변경
        </div>
      </div>
      <div className="mt-5">
        <Button label="🗝️ 로그아웃" onAction={signOutHandler} />
      </div>
      <button
        className="text-[#a29bfe] bg-slate-700 px-5 py-3 rounded font-bold"
        onClick={signOutHandler}
      >
        <div className="flex items-center gap-2">
          <TbLogout />
          Log out
        </div>
      </button>
    </Container>
  );
};

export default Profile;
