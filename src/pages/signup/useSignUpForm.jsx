import { useRef, useState, useEffect } from "react";
import useInput from "../../hooks/useCheckedInput";
import useMatchInput from "../../hooks/useCheckedMatchInput";
import axios from "../../api/axiosInstance";
import { HttpStatusCode } from "axios";
import { Role } from "../../constants/enums";
import { SIGNUP_PATH } from "../../constants/urlConstants";
import {
  NAMES_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../../constants/otherConstants";

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
    const roles = [Role.User.value];
    if (roleModerator) {
      roles.push(Role.Moderator.value);
    }
    if (roleAdmin) {
      roles.push(Role.Admin.value);
    }
    try {
      await axios.post(SIGNUP_PATH, {
        firstName,
        lastName,
        email,
        password,
        roles,
      });
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
