
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const UserPrivateRouter = ({ children }) => {
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const token = useSelector((store) => store.AuthReducer.token);
  const location = useLocation();

  return isAuth && token ? (
    children
  ) : (
    <Navigate to="/user_login" state={{ from: location }} replace />
  );
};

export default UserPrivateRouter;
