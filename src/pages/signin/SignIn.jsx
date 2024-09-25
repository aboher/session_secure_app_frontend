import { useEffect } from "react";
import { PasswordField, EmailField } from "../../components/InputFields";
import { Link } from "react-router-dom";
import useSignInForm from "./useSignInForm";
import ErrorMessage from "../../components/ErrorMessage";

export default function SignIn() {
  useEffect(() => {
    document.title = "Sign In";
  }, []);

  const {
    emailRef,
    setEmail,
    setPassword,
    errorRef,
    errorMessage,
    isSubmitting,
    handleSubmit,
  } = useSignInForm();

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6 offset-lg-3 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <section className="m-3">
            <h1 className="mb-3">Sign In</h1>

            <form onSubmit={handleSubmit}>
              <EmailField setEmail={setEmail} emailRef={emailRef} />

              <PasswordField setPassword={setPassword} />

              {errorMessage && (
                <ErrorMessage errorRef={errorRef} errorMessage={errorMessage} />
              )}

              <button disabled={isSubmitting} className="btn btn-primary mb-3">
                {isSubmitting ? "Submitting..." : "Sign In"}
              </button>
            </form>
            <p>
              Don&apos;t have an account yet?
              <br />
              <span>
                <Link to="/signup" className="icon-link icon-link-hover">
                  Sign Up
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
