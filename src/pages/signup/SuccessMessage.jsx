import { Link } from "react-router-dom";

export default function SuccessMessage() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        A verification email has been send to confirm your email address, please
        click on the link to confirm your account before signing in.
      </h2>
      <p>
        <Link to="/signin" className="icon-link icon-link-hover">
          Sign In<i className="bi bi-arrow-right"></i>
        </Link>
      </p>
    </div>
  );
}
