import { useEffect } from "react";
import { Link } from "react-router-dom";
import useSignUpForm from "./useSignUpForm";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import {
  FirstAndLastNameFields,
  EmailField,
  PasswordField,
  MatchPasswordField,
} from "../../components/InputFieldsWithValidation";

export default function SignUp() {
  const {
    firstNameRef,
    errRef,
    firstName,
    setFirstName,
    firstNameIsValid,
    lastName,
    setLasttName,
    lastNameIsValid,
    email,
    setEmail,
    emailIsValid,
    password,
    setPassword,
    passwordIsValid,
    matchPassword,
    setMatchPassword,
    matchPasswordIsValid,
    errorMessage,
    success,
    isSubmitting,
    handleSubmit,
    areInputFieldStatesValid,
  } = useSignUpForm();

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6 offset-lg-3 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <section className="m-3">
            {success ? (
              <SuccessMessage />
            ) : (
              <>
                <h1 className="mb-3">Sign Up</h1>

                <form onSubmit={handleSubmit}>
                  <FirstAndLastNameFields
                    firstName={firstName}
                    setFirstName={setFirstName}
                    firstNameIsValid={firstNameIsValid}
                    firstNameRef={firstNameRef}
                    lastName={lastName}
                    setLasttName={setLasttName}
                    lastNameIsValid={lastNameIsValid}
                  />

                  <EmailField
                    email={email}
                    setEmail={setEmail}
                    emailIsValid={emailIsValid}
                  />

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
                    {isSubmitting ? "Submitting..." : "Sign Up"}
                  </button>
                </form>
                <p>
                  Already registered? <br />
                  <span>
                    <Link to="/signin" className="icon-link icon-link-hover">
                      Sign In
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </span>
                </p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
