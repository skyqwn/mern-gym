import { useAppSelector } from "../store";
import { cls } from "../libs/util";

interface UserAvatarProps {
  big?: boolean;
}

const UserAvatar = ({ big }: UserAvatarProps) => {
  const userState = useAppSelector((state) => state.userSlice);
  return (
    <img
      className={cls(
        "rounded-full hover:ring-4 hover:ring-purple-300 relative flex items-center justify-center cursor-pointer",
        big ? "w-40 h-40" : "w-8 h-8"
      )}
      src={userState.user.avatar ? userState.user.avatar : "imgs/user.png"}
    />
  );
};

export default UserAvatar;
