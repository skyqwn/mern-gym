import React, { useEffect } from "react";
import Container from "../components/Container";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store";
import { postActions } from "../reducers/post/postSlice";
import PostCreateModal from "../components/modals/PostCreateModal";
import { fetchPost } from "../reducers/post/postThunk";
import { Link } from "react-router-dom";

const Community = () => {
  const postState = useAppSelector((state) => state.postSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPost());
  }, []);
  return (
    <Container>
      <PostCreateModal />
      <Button
        label="업로드"
        small
        onAction={() => {
          dispatch(postActions.createModalOpen({}));
        }}
      />
      {postState.posts.length > 0 &&
        postState.posts.map((post) => (
          <Link to={`${post.id}`} state={{ post }}>
            <div key={post.id} className="text-red-500">
              {post.title}
            </div>
          </Link>
        ))}
    </Container>
  );
};

export default Community;
