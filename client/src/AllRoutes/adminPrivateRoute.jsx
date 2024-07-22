

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminPrivateRouter = ({ children }) => {
  const isAuth = useSelector((store) => store.AdminAuthReducer.isAuth);
  const adminToken = useSelector((store) => store.AdminAuthReducer.adminToken);
  const location = useLocation();

  return  adminToken ? (
    children
  ) : (
    <Navigate to="/admin_login" state={{ from: location }} replace />
  );
};

export default AdminPrivateRouter;
