import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { instance } from "./api/apiconfig";
import { UserStateTypes } from "./types/userContextTypes";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<UserStateTypes | null>(null);
  useEffect(() => {
    instance
      .post("/api/user/refresh")
      .then((res) => {
        const {
          data: { accessToken, userEmail, userNickname },
        } = res;
        onSignin(accessToken, userEmail, userNickname);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSignin = (
    accessToken: string,
    userEmail: string,
    userNickname: string
  ) => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setAuth({ isLogin: true, email: userEmail, nickname: userNickname });
  };

  return (
    <UserContext.Provider value={{ auth, onSignin }}>
      {children}
    </UserContext.Provider>
  );
};
