
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const UserPrivateRouter = ({ children }) => {

  const userToken = useSelector((store) => store.UserAuthReducer.userToken);
  const location = useLocation();

  return userToken ? (
    children
  ) : (
    <Navigate to="/user_login" state={{ from: location }} replace />
  );
};

export default UserPrivateRouter;
