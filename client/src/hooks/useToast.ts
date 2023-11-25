import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { postActions } from "../reducers/post/postSlice";
import { galleryActions } from "../reducers/gallery/gallerySlice";

interface useToastProps {
  status: "" | "LOADING" | "SUCCESS" | "ERROR";
  errorMessage?: string;
  successMessage?: string;
  loadingMessage?: string;
  type?: any;
}

export default ({
  status,
  errorMessage = "실패!",
  successMessage = "성공!",
  loadingMessage = "로딩중...",
  type,
}: useToastProps) => {
  const navigate = useNavigate();
  const toastRef = useRef<string>("");
  const dispatch = useAppDispatch();
  const reset = () => {
    if (type === "post") {
      dispatch(postActions.resetStatus({}));
    }
    if ((type = "gallery")) {
      dispatch(galleryActions.resetStatus({}));
    }
  };
  useEffect(() => {
    if (status === "SUCCESS") {
      toast.success(successMessage, {
        id: toastRef.current,
      });
      reset();
    }
    if (status === "ERROR") {
      toast.error(errorMessage, {
        id: toastRef.current,
      });
    }
  }, [status]);
  const toastStart = () => {
    toastRef.current = toast.loading(loadingMessage);
  };
  return { toastStart };
};
