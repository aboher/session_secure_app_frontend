import { Link } from "react-router-dom";

export default function ModeratorSection() {
  return (
    <>
      <h2 className="mb-3">Moderator Role Required</h2>
      <Link to={"/moderator/attributes/"} className="btn btn-primary">
        View Session Attributes
      </Link>
    </>
  );
}
