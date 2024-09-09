import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { HttpStatusCode } from "axios";
import AuthContext from "../../context/AuthProvider";

const SIGNIN_URL = "/login";

export default function useSignInForm() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const usernameRef = useRef();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    usernameRef.current.focus();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

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
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      cleanUpInputFields();
      setIsAuthenticated(true);
      navigate("/");
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
    setUsername("");
    setPassword("");
  }

  return {
    usernameRef,
    setUsername,
    setPassword,
    errorRef,
    errorMessage,
    isSubmitting,
    handleSubmit,
  };
}
