import { Link } from "react-router-dom";

export default function SuccessMessage() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>The user was created successfully!</h1>
      <p>
        <Link to="/signin" className="icon-link icon-link-hover">
          Sign In<i className="bi bi-arrow-right"></i>
        </Link>
      </p>
    </div>
  );
}
