import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Inventory Management System";
  });

  return <h1>Home Page</h1>;
}
