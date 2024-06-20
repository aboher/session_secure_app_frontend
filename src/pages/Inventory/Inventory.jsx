import { useEffect } from "react";

export default function Inventory() {
  useEffect(() => {
    document.title = "Inventory Management System";
  });

  return <h1>Inventory page</h1>;
}
