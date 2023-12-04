import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";
import Loader from "../Loader";

const GalleryByUserBlock = () => {
  const userState = useAppSelector((state) => state.userSlice);
  // if (
  //   userState.galleryByUserStatus === "LOADING" ||
  //   !userState.galleryByUserStatus
  // )
  //   return <div>Loading...</div>;
  return (
    <div>
      <div className="mb-2">
        {userState.fetchUser.nickname}님이 갤러리에 쓴글
      </div>
      {!userState.fetchUser.galleries && <div>아직 작성한 글이 없습니다!</div>}
      {userState.fetchUser.galleries.map((gallery: any) => (
        <Link to={`/gallery/${gallery.id}`}>
          <div className="">{gallery.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default GalleryByUserBlock;
