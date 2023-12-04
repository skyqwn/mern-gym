import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Container from "../components/Container";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store";
import { postActions } from "../reducers/post/postSlice";
import PostCreateModal from "../components/modals/PostCreateModal";
import { fetchPost } from "../reducers/post/postThunk";
import Pagination from "../components/Pagination";
import PostBlock from "../components/block/PostBlock";
import Loader from "../components/Loader";

const Community = () => {
  const dispatch = useAppDispatch();
  const postState = useAppSelector((state) => state.postSlice);
  console.log(postState);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = Number(searchParams.get("page"));
  const navigate = useNavigate();
  const totalPage = postState.totalPage;

  const page = React.useMemo(() => {
    if (queryPage) return queryPage;
    return 1;
  }, [queryPage]);
  React.useEffect(() => {
    if (page > 0) {
      dispatch(fetchPost(page));
    } else {
      navigate("/community?page=1");
    }
  }, [page]);

  const modalOpen = () => {
    dispatch(postActions.createModalOpen({}));
  };
  // if (postState.fetchPost.length === 0) return <Loader />;
  return (
    <Container>
      <PostCreateModal />
      <div className="fixed bottom-24 right-5 shadow-xl  rounded-full w-14 flex items-center justify-center text-white">
        <Button label="✏️" small onAction={modalOpen} />
      </div>
      {postState.fetchPost.length > 0 &&
        postState.fetchPost.map((post) => <PostBlock post={post} />)}
      <Pagination currentPage={page} totalPage={totalPage} />
    </Container>
  );
};

export default Community;
