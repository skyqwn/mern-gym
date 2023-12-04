import React from "react";
import { TbLogout } from "react-icons/tb";

import Container from "../components/Container";
import { useAppDispatch, useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { UserContextTypes } from "../types/userContextTypes";
import { userActions } from "../reducers/user/userSlice";
import ProfileEditModal from "../components/modals/ProfileEditModal";
import { FetchUser, LikeByUser } from "../reducers/user/userThunk";
import PostByUserBlock from "../components/block/PostByUserBlock";
import GalleryByUserBlock from "../components/block/GalleryByUserBlock";
import LikeByUserBlock from "../components/block/LikeByUserBlock";
import UserAvatar from "../components/UserAvatar";

const Profile = () => {
  const userState = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { auth, onSignout } = React.useContext(UserContext) as UserContextTypes;
  console.log(userState);

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

  React.useEffect(() => {
    dispatch(LikeByUser());
    dispatch(FetchUser());
  }, []);

  return (
    <Container>
      <ProfileEditModal />
      <div className="lg:flex lg:gap-12">
        <div className="p-10 flex-col mt-10 border border-gray-300 rounded-md ">
          <div className="flex justify-center">
            <UserAvatar big />
          </div>
          <div className="flex justify-center mt-4">
            닉네임: {userState.user.nickname}
          </div>
          <div className="flex justify-center mt-4">
            <div
              className="flex justify-center border bg-purple-300 cursor-pointer hover:bg-purple-200 p-4 w-28 rounded-md"
              onClick={profileEditModalOpen}
            >
              정보변경
            </div>
          </div>
        </div>
        <div className=" divide-y-[1px] space-y-8 mt-10 lg:border-l-[1px] lg:pl-3 lg:w-full lg:space-y-14">
          <PostByUserBlock />
          <GalleryByUserBlock />
          <LikeByUserBlock />
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="text-[#a29bfe] bg-slate-700 px-5 py-3 rounded font-bold"
            onClick={signOutHandler}
          >
            <div className="flex items-center gap-2">
              <TbLogout />
              Log out
            </div>
          </button>
          {/* <div className="mt-5">
            <Button label="🗝️ 로그아웃" onAction={signOutHandler} />
          </div> */}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
