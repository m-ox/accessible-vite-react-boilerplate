import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  if (isLoading) return <div>Loading authentication...</div>; // or loading spinner
  // if (!user) return <Navigate to="/login" replace />;
  if (user || isAuthenticated) return children;

  // return children;
  return <Navigate to="/login" replace />;
}
