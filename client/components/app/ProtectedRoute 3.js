import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.auth.me);

  return user ? <Outlet /> : <Navigate to="/home" />;
};

export default ProtectedRoute;
