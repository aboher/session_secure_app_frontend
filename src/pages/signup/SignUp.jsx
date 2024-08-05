import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { HttpStatusCode } from "axios";
import { Link } from "react-router-dom";
import {
  FirstAndLastNameFields,
  EmailField,
  UsernameField,
  PasswordField,
  MatchPasswordField,
} from "./InputFields";
import useInput from "../../hooks/useInput";
import useMatchInput from "../../hooks/useMatchInput";

const NAMES_REGEX = /^\D{1,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = "http://localhost:8080/user";

export default function SignUp() {
  useEffect(() => {
    document.title = "Sign Up";
  });

  const firstNameRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName, firstNameIsValid] = useInput(NAMES_REGEX);

  const [lastName, setLasttName, lastNameIsValid] = useInput(NAMES_REGEX);

  const [email, setEmail, emailIsValid] = useInput(EMAIL_REGEX);

  const [username, setUsername, usernameIsValid] = useInput(USERNAME_REGEX);

  const [
    password,
    setPassword,
    passwordIsValid,
    matchPassword,
    setMatchPassword,
    matchPasswordIsValid,
  ] = useMatchInput(PASSWORD_REGEX);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, email, username, password, matchPassword]);

  useEffect(() => {
    if (errMsg) {
      errRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      errRef.current.focus();
    }
  }, [errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    // if button enabled with JS hack
    if (!areInputFieldsStatesValid()) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await axios.post(
        SIGNUP_URL,
        { firstName, lastName, email, username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      clearAllInputFieldsStates();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === HttpStatusCode.Conflict) {
        setErrMsg(
          `A user is using this value: ${err.response.data.errorMessage}`
        );
      } else if (err.response?.status === HttpStatusCode.BadRequest) {
        setErrMsg(`Invalid value: ${err.response.data.message}`);
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6 offset-lg-3 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <section className="m-3">
            {success ? (
              <div style={{ textAlign: "center" }}>
                <h1>The user was created successfully!</h1>
                <p>
                  <Link to="/signin" className="icon-link icon-link-hover">
                    Sign In<i className="bi bi-arrow-right"></i>
                  </Link>
                </p>
              </div>
            ) : (
              <>
                {errMsg && (
                  <div className="p-2 mb-3 bg-danger-subtle rounded-2 text-center">
                    <p ref={errRef} aria-live="assertive">
                      {errMsg}
                    </p>
                  </div>
                )}

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

                  <UsernameField
                    username={username}
                    setUsername={setUsername}
                    usernameIsValid={usernameIsValid}
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

                  <button
                    disabled={!areInputFieldStatesValid()}
                    className="btn btn-primary"
                  >
                    Sign Up
                  </button>

                  <p>
                    Already registered? <br />
                    <span>
                      <Link to="/signin" className="icon-link icon-link-hover">
                        Sign In
                        <i className="bi bi-arrow-right"></i>
                      </Link>
                    </span>
                  </p>
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );

  function areInputFieldsStatesValid() {
    return (
      NAMES_REGEX.test(firstName) &&
      NAMES_REGEX.test(lastName) &&
      EMAIL_REGEX.test(email) &&
      USERNAME_REGEX.test(username) &&
      PASSWORD_REGEX.test(password)
    );
  }

  function clearAllInputFieldsStates() {
    setFirstName("");
    setLasttName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setMatchPassword("");
  }

  function areInputFieldStatesValid() {
    return (
      firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      usernameIsValid &&
      passwordIsValid &&
      matchPasswordIsValid
    );
  }
}
