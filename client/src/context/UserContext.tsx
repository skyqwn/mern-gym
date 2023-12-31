import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

import { useAppDispatch } from "../store";
import { userActions } from "../reducers/user/userSlice";
import { SigninProps } from "../types/userContextTypes";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("/api/user/refresh")
      .then((res) => {
        const { data } = res;
        console.log(data);
        onSignin(data);
      })
      .catch((err) => {
        console.log(err);
        setAuth(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSignin = ({
    accessToken,
    nickname,
    id,
    avatar,
    galleries,
    posts,
  }: SigninProps) => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      dispatch(
        userActions.userFetch({
          nickname,
          id,
          avatar,
          galleries,
          posts,
        })
      );
      setAuth(true);
    }
    return;
  };

  const onSignout = async () => {
    axios.defaults.headers.common["Authorization"] = "";
    setAuth(false);
    dispatch(userActions.userFetch({ avatar: "", id: "", nickname: "" }));
    await axios.post(`/api/user/logout`);
  };

  const value = React.useMemo(() => {
    return { auth, onSignin, onSignout, loading };
  }, [auth, loading, onSignin, onSignout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
