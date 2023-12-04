import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";

const PostByUserBlock = () => {
  const userState = useAppSelector((state) => state.userSlice);
  // if (userState.postByUserStatus === "LOADING") return <div>Loading...</div>;
  return (
    <div>
      <div className="mb-2">
        {userState.fetchUser.nickname}님이 커뮤니티에 쓴글
      </div>
      {!userState.fetchUser.posts && <div>아직 작성한 글이 없습니다!</div>}
      <div>
        {userState.fetchUser.posts.map((post: any) => (
          <Link to={`/community/${post.id}`}>
            <div className="text-green-700">{post.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostByUserBlock;
