import React from "react";
import { IoMdHeart } from "react-icons/io";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { cls } from "../libs/util";
import { useAppDispatch } from "../store";
import { favPost } from "../reducers/post/postThunk";
import { favGallery } from "../reducers/gallery/galleryThunk";

interface HeartButtonProps {
  targetId: string;
  isLike: boolean;
}

const HeartButton = ({ targetId, isLike }: HeartButtonProps) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const type = React.useMemo(() => {
    if (pathname.includes("gallery")) {
      return "gallery";
    }
    if (pathname.includes("community")) {
      return "post";
    }
  }, [pathname]);

  const handleClick = () => {
    if (!type) {
      return toast.error("좋아요를 할 수 없습니다.");
    }
    if (type === "gallery") {
      dispatch(favGallery(targetId));
    }
    if (type === "post") {
      dispatch(favPost(targetId));
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cls(
        "p-3 rounded-md flex items-center justify-center cursor-pointer ",
        isLike ? "text-red-500" : "text-slate-500"
      )}
    >
      <IoMdHeart className="w-20 h-20" />
    </div>
  );
};

export default HeartButton;
