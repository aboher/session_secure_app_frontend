import { useState } from "react";
import PasswordValidationMessage from "./PasswordValidationMessage";

export function FirstAndLastNameFields({
  firstName,
  firstNameIsValid,
  firstNameRef,
  setFirstName,
  lastName,
  lastNameIsValid,
  setLasttName,
}) {
  return (
    <div className="row mb-3">
      <div className="col">
        <label htmlFor="firstName" className="form-label">
          First name:
        </label>
        <input
          type="text"
          id="firstName"
          className={`form-control ${
            firstName && (firstNameIsValid ? "is-valid" : "is-invalid")
          }`}
          ref={firstNameRef}
          onChange={(e) => setFirstName(e.target.value)}
          required
          aria-invalid={firstNameIsValid ? "false" : "true"}
          aria-describedby="fistnamenote"
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">
          <p id="firstnamenote">
            <i className="bi bi-info-circle-fill"></i>
            <span> </span>
            No numbers allowed
          </p>
        </div>
      </div>
      <div className="col">
        <label htmlFor="lastName" className="form-label">
          Last name:
        </label>
        <input
          type="text"
          id="lastName"
          className={`form-control ${
            lastName && (lastNameIsValid ? "is-valid" : "is-invalid")
          }`}
          onChange={(e) => setLasttName(e.target.value)}
          required
          aria-invalid={lastNameIsValid ? "false" : "true"}
          aria-describedby="lastnamenote"
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">
          <p id="lastnamenote">
            <i className="bi bi-info-circle-fill"></i>
            <span> </span>
            No numbers allowed
          </p>
        </div>
      </div>
    </div>
  );
}

export function EmailField({ email, emailIsValid, setEmail }) {
  return (
    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Email:
      </label>
      <input
        type="email"
        id="email"
        className={`form-control ${
          email && (emailIsValid ? "is-valid" : "is-invalid")
        }`}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-invalid={emailIsValid ? "false" : "true"}
        aria-describedby="emailnote"
      />
      <div className="valid-feedback">Looks good!</div>
      <div className="invalid-feedback">
        <p id="emailnote">
          <i className="bi bi-info-circle-fill"></i>
          <span> </span>
          Invalid email
        </p>
      </div>
    </div>
  );
}

export function PasswordField({ password, passwordIsValid, setPassword }) {
  const [showPwd, setShowPwd] = useState(false);

  const toggleShowPwd = () => {
    setShowPwd((prevShowPwd) => !prevShowPwd);
  };

  return (
    <div className="mb-3">
      <label htmlFor="password" className="form-label">
        Password:
      </label>
      <div className="input-group">
        <input
          type={showPwd ? "text" : "password"}
          id="password"
          className={`form-control ${
            password && (passwordIsValid ? "is-valid" : "is-invalid")
          }`}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={passwordIsValid ? "false" : "true"}
          aria-describedby="pwdnote"
        />
        <span
          className="input-group-text rounded-end-2"
          onClick={toggleShowPwd}
        >
          {showPwd ? (
            <i className="bi bi-eye-slash"></i>
          ) : (
            <i className="bi bi-eye"></i>
          )}
        </span>
        <div
          className={passwordIsValid ? "valid-feedback" : "invalid-feedback"}
        >
          <p id="pwdnote">
            <PasswordValidationMessage password={password} />
          </p>
        </div>
      </div>
    </div>
  );
}

export function MatchPasswordField({
  matchPassword,
  matchPasswordIsValid,
  setMatchPassword,
}) {
  const [showMatchPwd, setShowMatchPwd] = useState(false);

  const toggleShowMatchPwd = () => {
    setShowMatchPwd((prevShowMatchPwd) => !prevShowMatchPwd);
  };

  return (
    <div className="mb-3">
      <label htmlFor="confirm_pwd" className="form-label">
        Confirm Password:
      </label>
      <div className="input-group">
        <input
          type={showMatchPwd ? "text" : "password"}
          id="confirm_pwd"
          className={`form-control ${
            matchPassword && (matchPasswordIsValid ? "is-valid" : "is-invalid")
          }`}
          onChange={(e) => setMatchPassword(e.target.value)}
          required
          aria-invalid={matchPasswordIsValid ? "false" : "true"}
          aria-describedby="confirmnote"
        />
        <span
          className="input-group-text rounded-end-2"
          onClick={toggleShowMatchPwd}
        >
          {showMatchPwd ? (
            <i className="bi bi-eye-slash"></i>
          ) : (
            <i className="bi bi-eye"></i>
          )}
        </span>
        <div className="valid-feedback">Looks Good!</div>
        <div className="invalid-feedback">
          <p id="confirmnote">
            <i className="bi bi-info-circle-fill"></i> Must match the first
            password input field.
          </p>
        </div>
      </div>
    </div>
  );
}
