import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";

export default function Home() {
  const { isAuthenticated, session } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Inventory Management System";
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <p>
        Content:{" "}
        {isAuthenticated
          ? JSON.stringify(session)
          : "You are not authenticated"}
      </p>
    </>
  );
}
