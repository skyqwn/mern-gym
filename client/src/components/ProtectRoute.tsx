import React from "react";
import { UserContext } from "../context/UserContext";
import { UserContextTypes } from "../types/userContextTypes";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }: React.PropsWithChildren) => {
  const { auth, loading } = React.useContext(UserContext) as UserContextTypes;
  if (loading) {
    return <>Loading...</>;
  }
  if (!auth?.isLogin) {
    return <Navigate to={"/auth"} />;
  }
  return <div>{children}</div>;
};

export default ProtectRoute;
