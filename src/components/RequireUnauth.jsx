import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";

const RequireUnauth = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (loading) {
    return <Loading />;
  }

  return !isAuthenticated ? (
    children
  ) : (
    <Navigate to={from} replace state={{ from: location }} />
  );
};

export default RequireUnauth;
