import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Home() {
  const { isAuthenticated, session, loading } = useAuth();

  useEffect(() => {
    document.title = "Inventory Management System";
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <p>
        Content:{" "}
        {!loading &&
          (isAuthenticated
            ? JSON.stringify(session)
            : "You are not authenticated")}
      </p>
      <Link to="/" className="btn btn-primary mb-1">
        Home
      </Link>
      <br />
      <Link to="/inventory" className="btn btn-primary mb-1">
        Inventory
      </Link>
      <br />
      <Link to="/inventory/item/:1" className="btn btn-primary mb-1">
        Inventory item
      </Link>
      <br />
      <Link to="/inventory/additem" className="btn btn-primary mb-1">
        Inventory additem
      </Link>
      <br />
      <Link to="/inventory/updateitem" className="btn btn-primary mb-1">
        Inventory update
      </Link>
      <br />
      <Link to="/signin" className="btn btn-primary mb-1">
        Sign in
      </Link>
      <br />
      <Link to="/signup" className="btn btn-primary mb-1">
        Sign up
      </Link>
      <br />
    </>
  );
}
