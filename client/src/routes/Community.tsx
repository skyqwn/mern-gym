import React, { useEffect } from "react";
import Container from "../components/Container";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store";
import { postActions } from "../reducers/postSlice";
import PostCreateModal from "../components/modals/PostCreateModal";
import { fetchPost } from "../reducers/createPost";

const Community = () => {
  const postState = useAppSelector((state) => state.postSlice);
  console.log(postState.posts);
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
          dispatch(postActions.handleCreateModal(true));
        }}
      />
      {postState.posts.length > 0 &&
        postState.posts.map((post) => (
          <div className="text-red-500">{post.title}</div>
        ))}
    </Container>
  );
};

export default Community;
