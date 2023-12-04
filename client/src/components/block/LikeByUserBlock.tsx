import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";

const LikeByUserBlock = () => {
  const userState = useAppSelector((state) => state.userSlice);
  if (userState.likeByUserStatus === "LOADING" || !userState.likeByUser)
    return <div>Loading...</div>;
  return (
    <div>
      <div className="mb-2">{userState.user.nickname}님이 좋아요한 글</div>
      {userState.likeByUser.length === 0 && (
        <div>아직 좋아요한 글이 없습니다!</div>
      )}
      {userState.likeByUser.map((like: any) => (
        <Link to={like.link!}>
          <div className="">{like.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default LikeByUserBlock;
