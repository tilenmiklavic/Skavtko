import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../../services/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};
