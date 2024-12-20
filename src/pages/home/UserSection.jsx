import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function UserSection() {
  const { session } = useAuth();

  return (
    <>
      <h2 className="mb-3">User Role Required</h2>
      <Link to={"/user/session-info/current-session"} className="btn btn-primary mb-3">
        View Current Session Information
      </Link>
      <br />
      <Link
        to={`/user/active-sessions/${session?.email ? session.email : "current-user"}`}
        className="btn btn-primary"
      >
        View All Active Sessions
      </Link>
    </>
  );
}
