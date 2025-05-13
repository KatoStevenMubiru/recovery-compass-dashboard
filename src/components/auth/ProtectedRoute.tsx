import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Optionally, show a loading spinner
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login, and preserve the current location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
