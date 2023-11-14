import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { Button } from "../components/Button";
import Container from "../components/Container";

import { postActions } from "../reducers/post/postSlice";
import PostEditModal from "../components/modals/PostEditModal";
import { detailPost } from "../reducers/post/postThunk";
import { PostType } from "../types/postTypes";
import PostDeleteConfirm from "../components/confirms/PostDeleteConfirm";
import TextArea from "../components/Inputs/TextArea";
import { useForm } from "react-hook-form";

const CommunityDetail = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string };
  const postState = useAppSelector((state) => state.postSlice);
  const [data, setData] = React.useState<PostType | null>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});
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
      <PostDeleteConfirm />
      <PostEditModal />
      <h3>{data?.category}</h3>
      <h1 className="text-4xl">{data?.title}</h1>
      <span>{data?.desc}</span>
      <Button
        small
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
      <TextArea
        name="comments"
        control={control}
        errors={errors}
        label="댓글"
      />
    </Container>
  );
};

export default CommunityDetail;
