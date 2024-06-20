import { useEffect } from "react";

export default function AddItem() {
  useEffect(() => {
    document.title = "Add Item";
  });

  return <h1>Add Item</h1>;
}
