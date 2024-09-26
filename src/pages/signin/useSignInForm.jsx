import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import { HttpStatusCode } from "axios";
import useAuth from "../../hooks/useAuth";

const SIGNIN_URL = "/login";

export default function useSignInForm() {
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const emailRef = useRef();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  useEffect(() => {
    if (errorMessage) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      errorRef.current.focus();
    }
  }, [errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    await signIn();
    setIsSubmitting(false);
  };

  const signIn = async () => {
    try {
      await axios.post(
        SIGNIN_URL,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      cleanUpInputFields();
      setIsAuthenticated(true);
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("No Server Response");
      } else if (error.response?.status === HttpStatusCode.Unauthorized) {
        setErrorMessage(error.response?.data?.errorMessage);
      } else {
        setErrorMessage("Sign in failed");
      }
    }
  };

  function cleanUpInputFields() {
    setEmail("");
    setPassword("");
  }

  return {
    emailRef,
    setEmail,
    setPassword,
    errorRef,
    errorMessage,
    isSubmitting,
    handleSubmit,
  };
}
