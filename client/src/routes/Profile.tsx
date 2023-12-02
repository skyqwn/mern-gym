import React from "react";
import { TbLogout } from "react-icons/tb";

import Container from "../components/Container";
import { useAppDispatch, useAppSelector } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { UserContextTypes } from "../types/userContextTypes";
import { userActions } from "../reducers/user/userSlice";
import ProfileEditModal from "../components/modals/ProfileEditModal";
import { GalleryByUser, PostByUser } from "../reducers/user/userThunk";
import Loader from "../components/Loader";

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
    dispatch(PostByUser());
  }, []);
  React.useEffect(() => {
    dispatch(GalleryByUser());
  }, []);
  if (userState.postByUserStatus === "LOADING") return <Loader />;
  if (userState.galleryByUserStatus === "LOADING") return <Loader />;
  return (
    <Container>
      <ProfileEditModal />
      <div className="p-10 flex-col mt-10 border border-gray-300 rounded-md ">
        <div className="flex justify-center">
          <img className="w-40 h-40 rounded-full" src={userState.user.avatar} />
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
      <div className=" divide-y-[1px] space-y-4">
        <div>
          {userState.user.nickname}님이 커뮤니티에 쓴글
          <div>
            {userState.postByUser.posts.map((post: any) => (
              <Link to={`/community/${post.id}`}>
                <div className="text-green-700">{post.title}</div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          {userState.user.nickname}님이 갤러리에 쓴글
          {userState.galleryByUser.galleries.map((gallery: any) => (
            <Link to={`/gallery/${gallery.id}`}>
              <div className="">{gallery.title}</div>
            </Link>
          ))}
        </div>
        <div>{userState.user.nickname}님이 좋아요한 모든글</div>
      </div>
    </Container>
  );
};

export default Profile;
