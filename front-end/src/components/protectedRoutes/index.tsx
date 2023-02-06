import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../providers/User";

export const ProtectedRoutes = () => {
  const { loading, user } = useUser();

  if (loading) return null;

  return user ? <Outlet /> : <Navigate to="/" replace />;
};
