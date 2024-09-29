import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import { HttpStatusCode } from "axios";
import Loading from "./Loading";
import ErrorMessage from "../components/ErrorMessage";

const CONFIRM_ACCOUNT_PATH = "/users/confirm-account";

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const didRun = useRef(false);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        await axios.post(
          CONFIRM_ACCOUNT_PATH + "?token=" + searchParams.get("token"),
          null,
          { withCredentials: true }
        );
      } catch (error) {
        if (!error?.response) {
          setErrorMessage("No Server Response");
        } else if (error.response?.status === HttpStatusCode.Unauthorized) {
          setErrorMessage(error.response?.data?.errorMessage);
        } else {
          setErrorMessage("Could not confirm email");
        }
      } finally {
        setLoading(false);
      }
    };
    if (!didRun.current) {
      didRun.current = true;
      confirmEmail();
    }
  }, [searchParams]);

  return loading ? (
    <Loading />
  ) : (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6 offset-lg-3 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <section className="m-3" style={{ textAlign: "center" }}>
            {errorMessage ? (
              <>
                <h1>Confirmation Failed</h1>
                <ErrorMessage errorMessage={errorMessage} />
              </>
            ) : (
              <>
                <h1>Email has been confirmed successfully</h1>
                <p>
                  <Link to="/signin" className="icon-link icon-link-hover">
                    Sign In<i className="bi bi-arrow-right"></i>
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
