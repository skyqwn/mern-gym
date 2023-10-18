import { useNavigate } from "react-router-dom";
import CONSTANT from "../constant";
import { toast } from "react-toastify";

export default () => {
  const navigate = useNavigate();

  const errorHandler = (error: any) => {
    const {
      response: { data, status },
    } = error;

    const message = data.message || CONSTANT.ERROR_MESSAGE.SERVER;

    toast.error(message);

    if (message === CONSTANT.ERROR_MESSAGE.REFRESH_TOKEN) {
      navigate("/auth");
    }
  };
  return errorHandler;
};
