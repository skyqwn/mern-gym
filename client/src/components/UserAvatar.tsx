import React from "react";
import { useAppSelector } from "../store";
import { cls } from "../libs/util";

interface UserAvatarProps {
  big?: boolean;
}

const UserAvatar = ({ big }: UserAvatarProps) => {
  const userState = useAppSelector((state) => state.userSlice);
  return (
    <img
      className={cls("rounded-full", big ? "w-20 h-20" : "w-8 h-8")}
      src={userState.user.avatar ? userState.user.avatar : "imgs/user.png"}
    />
  );
};

export default UserAvatar;
