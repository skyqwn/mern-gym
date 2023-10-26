import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { Button } from "../components/Button";
import Container from "../components/Container";
import PostCreateModal from "../components/modals/PostCreateModal";
import { postActions } from "../reducers/postSlice";
import PostEditModal from "../components/modals/PostEditModal";
import { detailPost, editPost, removePost } from "../reducers/createPost";
import { PostType } from "../types/postTypes";
import Loader from "../components/Loader";
import PostDeleteConfirm from "../components/confirms/PostDeleteConfirm";

const CommunityDetail = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string };
  const postState = useAppSelector((state) => state.postSlice);
  const navigate = useNavigate();
  const [data, setData] = React.useState<PostType | null>(null);

  useEffect(() => {
    if (location.state) {
      if (location.state.post) {
        setData(location.state.post);
      }
    } else {
      dispatch(detailPost(params.id));
    }
  }, []);

  useEffect(() => {
    if (postState.post && postState.status === "SUCCESS") {
      setData(postState.post);
    }
  }, [postState.post]);

  // if (postState.status === "LOADING") {
  //   return <Loader />;
  // }

  return (
    <Container>
      <button
        onClick={() => {
          dispatch(removePost(params.id));
          navigate("/community");
        }}
      >
        delete
      </button>
      <PostDeleteConfirm />
      <PostEditModal />
      <h3>{data?.category}</h3>
      <h1 className="text-4xl">{data?.title}</h1>
      <span>{data?.desc}</span>
      <Button
        label="수정"
        onAction={() => {
          // dispatch(postActions.handleEditModal({ isOpen: true, post: data }));
          dispatch(postActions.editModalOpen(data));
        }}
      />
      <Button
        label="❌"
        onAction={() => {
          dispatch(postActions.deleteConfirmOpen(data));
        }}
      />
    </Container>
  );
};

export default CommunityDetail;
