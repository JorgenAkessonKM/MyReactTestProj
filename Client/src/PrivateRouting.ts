import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";

export default function PrivateRoute() {
  const user = useAuth();
  if (!user?.token) return React.createElement(Navigate, { to: "/login", replace: true });
  return React.createElement(Outlet);
};