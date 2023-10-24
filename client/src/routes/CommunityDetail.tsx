import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { Button } from "../components/Button";
import Container from "../components/Container";
import PostCreateModal from "../components/modals/PostCreateModal";
import { postActions } from "../reducers/postSlice";
import PostEditModal from "../components/modals/PostEditModal";
import { detailPost, editPost, removePost } from "../reducers/createPost";

const CommunityDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const post = useAppSelector((state) => state.postSlice.post);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(detailPost(id as string));
  }, []);
  return (
    <Container>
      <button
        onClick={() => {
          dispatch(removePost(id + ""));
          navigate("/community");
        }}
      >
        delete
      </button>
      <PostEditModal />
      <h3>{post?.category}</h3>
      <h1 className="text-4xl">{post?.title}</h1>
      <span>{post?.desc}</span>
      <Button
        label="수정"
        onAction={() => {
          dispatch(postActions.handleEditModal(true));
        }}
      />
    </Container>
  );
};

export default CommunityDetail;
