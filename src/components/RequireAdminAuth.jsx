import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";
import { Role } from "../constants/enums";
import UnableToAccessMessage from "../pages/UnableToAccessMessage";

const RequireAdminAuth = ({ children }) => {
  const { isAuthenticated, session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  return isAuthenticated ? (
    session.roles.includes(Role.Admin.value) ? (
      children
    ) : (
      <UnableToAccessMessage roleNeeded={Role.Admin.name} />
    )
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default RequireAdminAuth;
