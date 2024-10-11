import { Link } from "react-router-dom";

export default function AdminSection() {
  return (
    <>
      <h2 className="mb-3">Admin Role Required</h2>
      <Link to={"/admin/active-sessions/"} className="btn btn-primary">
        View All Active Sessions From All Users
      </Link>
    </>
  );
}
