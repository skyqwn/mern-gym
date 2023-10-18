import React from "react";
import Container from "../components/Container";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store";
import { postActions } from "../reducers/postSlice";
import PostCreateModal from "../components/modals/PostCreateModal";

const Community = () => {
  const modal = useAppSelector((state) => state.postSlice.createModalIsOpen);
  const dispatch = useAppDispatch();
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
    </Container>
  );
};

export default Community;
