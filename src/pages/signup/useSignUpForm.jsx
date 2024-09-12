import { useRef, useState, useEffect } from "react";
import useInput from "../../hooks/useCheckedInput";
import useMatchInput from "../../hooks/useCheckedMatchInput";
import axios from "../../api/axios";
import { HttpStatusCode } from "axios";

const SIGNUP_URL = "/users";
const NAMES_REGEX = /^\D{1,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function useSignUpForm() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [firstName, lastName, email, username, password, matchPassword]);

  useEffect(() => {
    if (errorMessage) {
      errRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      errRef.current.focus();
    }
  }, [errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    if (!areInputFieldStatesValid()) {
      setErrorMessage("Invalid Entry");
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    await signUp();
    setIsSubmitting(false);
  };

  const signUp = async () => {
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
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("No Server Response");
      } else if (error.response?.status === HttpStatusCode.Conflict) {
        setErrorMessage(error.response.data.errorMessage);
      } else if (error.response?.status === HttpStatusCode.BadRequest) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Registration Failed");
      }
    }
  };

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

  function clearAllInputFieldsStates() {
    setFirstName("");
    setLasttName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setMatchPassword("");
  }

  return {
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
    username,
    setUsername,
    usernameIsValid,
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
  };
}
