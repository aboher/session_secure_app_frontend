import { useEffect, useRef, useState } from "react";
import { EmailField } from "../components/InputFields";
import axios from "../api/axiosInstance";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";
import { REQUEST_PASSWORD_CHANGE_PATH } from "../constants/urlConstants";

export default function RequestPasswordChange() {
  const [email, setEmail] = useState("");
  const emailRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    await requestPasswordChange();
    setIsSubmitting(false);
  };

  const requestPasswordChange = async () => {
    try {
      await axios.post(REQUEST_PASSWORD_CHANGE_PATH + "?email=" + email, null);
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("No Server Response");
      } else {
        setErrorMessage("Request failed");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6 offset-lg-3 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <section className="m-3">
            {success ? (
              <>
                <h2>
                  You&apos;ve been send an email with a link to change your
                  password
                </h2>
                <Link to="/" className="icon-link icon-link-hover">
                  Go to home
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </>
            ) : (
              <>
                <h2 className="mb-3">
                  Insert your email to change your password
                </h2>

                <form onSubmit={handleSubmit}>
                  <EmailField setEmail={setEmail} emailRef={emailRef} />

                  {errorMessage && (
                    <ErrorMessage
                      errorRef={errorRef}
                      errorMessage={errorMessage}
                    />
                  )}

                  <button
                    disabled={isSubmitting}
                    className="btn btn-primary mb-3"
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Request to change password"}
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
