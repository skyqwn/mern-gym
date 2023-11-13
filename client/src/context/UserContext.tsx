import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { instance } from "../api/apiconfig";
import { UserStateTypes } from "../types/userContextTypes";
import { useAppDispatch } from "../store";
import { userActions } from "../reducers/user/userSlice";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const [auth, setAuth] = useState<UserStateTypes | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    instance
      .post("/api/user/refresh")
      .then((res) => {
        const {
          data: { accessToken, userEmail, userNickname, id },
        } = res;
        onSignin(accessToken, userEmail, userNickname, id);
      })
      .catch((err) => {
        console.log(err);
        setAuth(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSignin = (
    accessToken: string,
    userEmail: string,
    userNickname: string,
    id: string
  ) => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setAuth({ isLogin: true, email: userEmail, nickname: userNickname });
    dispatch(userActions.userFetch({ nickname: userNickname, id }));
  };

  const value = React.useMemo(() => {
    return { auth, onSignin, loading };
  }, [auth, loading, onSignin]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
