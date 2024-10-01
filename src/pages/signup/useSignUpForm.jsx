import { useRef, useState, useEffect } from "react";
import useInput from "../../hooks/useCheckedInput";
import useMatchInput from "../../hooks/useCheckedMatchInput";
import axios from "../../api/axiosInstance";
import { HttpStatusCode } from "axios";
import { Role } from "../../constants/enums";

const SIGNUP_URL = "/users";
const NAMES_REGEX = /^\D{1,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function useSignUpForm() {
  const firstNameRef = useRef();
  const errRef = useRef();
  const [firstName, setFirstName, firstNameIsValid] = useInput(NAMES_REGEX);
  const [lastName, setLasttName, lastNameIsValid] = useInput(NAMES_REGEX);
  const [email, setEmail, emailIsValid] = useInput(EMAIL_REGEX);
  const [
    password,
    setPassword,
    passwordIsValid,
    matchPassword,
    setMatchPassword,
    matchPasswordIsValid,
  ] = useMatchInput(PASSWORD_REGEX);
  const [roleModerator, setRoleModerator] = useState(false);
  const [roleAdmin, setRoleAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [firstName, lastName, email, password, matchPassword]);

  useEffect(() => {
    if (errorMessage) {
      errRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      errRef.current.focus();
    }
  }, [errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
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
    const roles = [Role.User];
    if (roleModerator) {
      roles.push(Role.Moderator);
    }
    if (roleAdmin) {
      roles.push(Role.Admin);
    }
    try {
      await axios.post(
        SIGNUP_URL,
        { firstName, lastName, email, password, roles },
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
      } else if (error.response?.status === HttpStatusCode.BadRequest) {
        setErrorMessage(error.response?.data?.errorMessage);
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
      passwordIsValid &&
      matchPasswordIsValid
    );
  }

  function clearAllInputFieldsStates() {
    setFirstName("");
    setLasttName("");
    setEmail("");
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
    password,
    setPassword,
    passwordIsValid,
    matchPassword,
    setMatchPassword,
    matchPasswordIsValid,
    setRoleModerator,
    setRoleAdmin,
    errorMessage,
    success,
    isSubmitting,
    handleSubmit,
    areInputFieldStatesValid,
  };
}
