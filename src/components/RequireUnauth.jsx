import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireUnauth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return !isAuthenticated ? (
    children
  ) : (
    <Navigate to={from} replace state={{ from: location }} />
  );
};

export default RequireUnauth;
