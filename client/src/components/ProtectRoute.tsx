import React from "react";
import { UserContext } from "../context/UserContext";
import { UserContextTypes } from "../types/userContextTypes";
import { Navigate, useLocation } from "react-router-dom";

const ProtectRoute = ({ children }: React.PropsWithChildren) => {
  const { pathname: from } = useLocation();
  const { auth, loading } = React.useContext(UserContext) as UserContextTypes;
  if (loading) {
    return <>Loading...</>;
  }
  if (!auth) {
    return <Navigate to={"/auth"} state={{ from }} />;
  }
  return <div>{children}</div>;
};

export default ProtectRoute;
