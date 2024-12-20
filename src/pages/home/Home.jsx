import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import AuthenticatedMessage from "./AuthenticatedMessage";
import UnauthenticatedMessage from "./UnauthenticatedMessage";
import UserSection from "./UserSection";
import ModeratorSection from "./ModeratorSection";
import AdminSection from "./AdminSection";
import Spinner from "../../components/Spinner";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    document.title = "Session Secure App";
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-lg-6 offset-lg-3 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
            <h1 className="text-center">Home Page</h1>
            {!loading ? (
              isAuthenticated ? (
                <AuthenticatedMessage />
              ) : (
                <UnauthenticatedMessage />
              )
            ) : (
              <div className="text-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-md-3 mb-3 border border-secondary-subtle rounded-3 text-bg-light p-3">
            <UserSection />
          </div>
          <div className="col col-12 col-md-3 mx-md-auto mb-3 border border-secondary-subtle rounded-3 text-bg-light p-3">
            <ModeratorSection />
          </div>
          <div className="col col-12 col-md-3 mb-3 border border-secondary-subtle rounded-3 text-bg-light p-3">
            <AdminSection />
          </div>
        </div>
      </div>
    </>
  );
}
