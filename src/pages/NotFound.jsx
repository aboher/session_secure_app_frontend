import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found";
  });

  return <h1 style={{ textAlign: "center" }}>Page Not Found</h1>;
}
