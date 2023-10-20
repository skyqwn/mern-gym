import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { Button } from "../components/Button";
import Container from "../components/Container";
import PostCreateModal from "../components/modals/PostCreateModal";
import { postActions } from "../reducers/postSlice";

const CommunityDetail = () => {
  const isOpen = useAppSelector((state) => state.postSlice.createModalIsOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const posts = useAppSelector((state) => state.postSlice.posts);
  const existPost: any = posts.find((post: any) => post.id === id);

  return (
    <Container>
      <PostCreateModal />
      <h3>{existPost.category}</h3>
      <h1 className="text-4xl">{existPost.title}</h1>
      <span>{existPost.desc}</span>
      <Button
        label="수정"
        onAction={() => {
          dispatch(postActions.handleCreateModal(true));
        }}
      />
    </Container>
  );
};

export default CommunityDetail;
