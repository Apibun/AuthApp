import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const roleCanAccess = roles?.some((r) => user?.roles.includes(r));

  if (loading) {
    // optional: show spinner or blank page
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roleCanAccess) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
