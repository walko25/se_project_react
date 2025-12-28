import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn === false) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
