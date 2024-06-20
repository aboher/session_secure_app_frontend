import { useEffect } from "react";

export default function SignIn() {
  useEffect(() => {
    document.title = "Sign In";
  });

  return <h1>Sign In</h1>;
}
