import { Link } from "react-router-dom";

export default function UserSection() {
  return (
    <>
      <h2 className="mb-3">User Role Required</h2>
      <Link
        to={"/user/session-info/current-session"}
        className="btn btn-primary mb-3"
      >
        View Current Session Information
      </Link>
      <Link to={"/user/active-sessions/"} className="btn btn-primary">
        View All Active Sessions
      </Link>
    </>
  );
}
