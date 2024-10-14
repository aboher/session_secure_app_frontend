import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function useSignInForm() {
  const { signIn } = useAuth();
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
    await signUserIn();
    setIsSubmitting(false);
  };

  const signUserIn = async () => {
    try {
      await signIn({ email, password });
      cleanUpInputFields();
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("No Server Response");
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
