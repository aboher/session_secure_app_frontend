import { useRef, useState } from "react";
import {
  MatchPasswordField,
  PasswordField,
} from "../components/InputFieldsWithValidation";
import useCheckedMatchInput from "../hooks/useCheckedMatchInput";
import ErrorMessage from "../components/ErrorMessage";
import { Link, useSearchParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import { HttpStatusCode } from "axios";
import { PASSWORD_CHANGE_PATH } from "../constants/urlConstants";
import { PASSWORD_REGEX } from "../constants/otherConstants";

export default function ChangePassword() {
  const [
    password,
    setPassword,
    passwordIsValid,
    matchPassword,
    setMatchPassword,
    matchPasswordIsValid,
  ] = useCheckedMatchInput(PASSWORD_REGEX);
  const [errorMessage, setErrorMessage] = useState("");
  const errRef = useRef();
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    if (!areInputFieldStatesValid()) {
      setErrorMessage("Invalid Entry");
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    await changePassword();
    setIsSubmitting(false);
  };

  const changePassword = async () => {
    try {
      await axios.patch(PASSWORD_CHANGE_PATH + searchParams.get("token"), {
        password,
      });
      clearAllInputFieldsStates();
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("No Server Response");
      } else if (
        error.response?.status === HttpStatusCode.BadRequest ||
        error.response?.status === HttpStatusCode.Unauthorized
      ) {
        setErrorMessage(error.response?.data?.errorMessage);
      } else {
        setErrorMessage("Password change failed");
      }
    } finally {
      setDone(true);
    }
  };

  function clearAllInputFieldsStates() {
    setPassword("");
    setMatchPassword("");
  }

  function areInputFieldStatesValid() {
    return passwordIsValid && matchPasswordIsValid;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6 offset-lg-3 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <section className="m-3">
            {done ? (
              errorMessage ? (
                <>
                  <h2>Password change has failed, please try again</h2>
                  <p>
                    <Link
                      to="/request-password-change"
                      className="icon-link icon-link-hover"
                    >
                      Generate link to change my password
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </p>
                  <ErrorMessage errorMessage={errorMessage} errorRef={errRef} />
                </>
              ) : (
                <>
                  <h2>Your password has been changed successfully</h2>
                  <Link to="/signin" className="icon-link icon-link-hover">
                    Sign In
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </>
              )
            ) : (
              <>
                <h1 className="mb-3">Change your password</h1>

                <form onSubmit={handleSubmit}>
                  <PasswordField
                    password={password}
                    passwordIsValid={passwordIsValid}
                    setPassword={setPassword}
                  />

                  <MatchPasswordField
                    matchPassword={matchPassword}
                    setMatchPassword={setMatchPassword}
                    matchPasswordIsValid={matchPasswordIsValid}
                  />

                  {errorMessage && (
                    <ErrorMessage
                      errorMessage={errorMessage}
                      errorRef={errRef}
                    />
                  )}

                  <button
                    disabled={!areInputFieldStatesValid() || isSubmitting}
                    className="btn btn-primary mb-3"
                  >
                    {isSubmitting ? "Submitting..." : "Change Password"}
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
