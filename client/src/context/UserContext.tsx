import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { instance } from "../api/apiconfig";
import { useAppDispatch } from "../store";
import { userActions } from "../reducers/user/userSlice";
import { AuthType } from "../types/userContextTypes";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const [auth, setAuth] = useState<AuthType | null>(null);
  const [loading, setLoading] = useState(true);

  const initAuth = {
    loggedIn: false,
    email: "",
    nickname: "",
  };

  useEffect(() => {
    instance
      .post("/api/user/refresh")
      .then((res) => {
        const {
          data: { accessToken, userEmail, userNickname, id, avatar },
        } = res;
        onSignin(accessToken, userEmail, userNickname, id, avatar);
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
    id: string,
    avatar: string
  ) => {
    if (accessToken) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      dispatch(userActions.userFetch({ nickname: userNickname, id, avatar }));
      setAuth({ loggedIn: true, email: userEmail, nickname: userNickname });
    }
    return;
  };

  const onSignout = () => {
    instance.defaults.headers.common["Authorization"] = "";
    setAuth(initAuth);
  };

  const value = React.useMemo(() => {
    return { auth, onSignin, onSignout, loading };
  }, [auth, loading, onSignin, onSignout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
