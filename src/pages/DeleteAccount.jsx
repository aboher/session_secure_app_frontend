import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import { HttpStatusCode } from "axios";
import Loading from "./Loading";
import ErrorMessage from "../components/ErrorMessage";
import { DELETE_ACCOUNT_PATH } from "../constants/urlConstants";
import useAuth from "../hooks/useAuth";

export default function DeleteAccount() {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const didRun = useRef(false);
  const { signOut } = useAuth();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        await axios.delete(
          DELETE_ACCOUNT_PATH + "?token=" + searchParams.get("token")
        );
        setTimeout(signOut, 2000);
      } catch (error) {
        if (!error?.response) {
          setErrorMessage("No Server Response");
        } else if (error.response?.status === HttpStatusCode.Unauthorized) {
          setErrorMessage(error.response?.data?.errorMessage);
        } else {
          setErrorMessage("Could not delete account");
        }
      } finally {
        setLoading(false);
      }
    };
    if (!didRun.current) {
      didRun.current = true;
      confirmEmail();
    }
  }, [searchParams, signOut]);

  return loading ? (
    <Loading />
  ) : (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6 offset-lg-3 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <section className="m-3" style={{ textAlign: "center" }}>
            {errorMessage ? (
              <>
                <h1>Account deletion failed</h1>
                <ErrorMessage errorMessage={errorMessage} />
              </>
            ) : (
              <>
                <h1>Your account has been deleted.</h1>
                <p>
                  <Link to="/" className="icon-link icon-link-hover">
                    Go to home<i className="bi bi-arrow-right"></i>
                  </Link>
                </p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
