
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const UserPrivateRouter = ({ children }) => {
  const isAuth = useSelector((store) => store.UserAuthReducer.isAuth);
  const userToken = useSelector((store) => store.UserAuthReducer.userToken);
  const location = useLocation();

  return isAuth && userToken ? (
    children
  ) : (
    <Navigate to="/user_login" state={{ from: location }} replace />
  );
};

export default UserPrivateRouter;
