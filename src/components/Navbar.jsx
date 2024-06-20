import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand hover-rotate" href="/">
          <img
            src="../../open-cardboard-box.svg"
            alt="Cardboard box"
            width="45px"
          />
          <span style={{ margin: "10px" }}>Inventory Management System</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <Link className="btn btn-outline-success m-1" to="/signin">
            Sign In
          </Link>
          <Link className="btn btn-outline-success m-1" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
